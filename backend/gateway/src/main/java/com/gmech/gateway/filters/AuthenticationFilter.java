package com.gmech.gateway.filters;

import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.stereotype.Component;

import com.gmech.gateway.validation.ValidationResponse;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{
    
    private final WebClient.Builder webClientBuilder;

    public AuthenticationFilter(WebClient.Builder webClientBuilder){
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

    @Override
    public GatewayFilter apply(Config config){
        return (exchange, chain) -> {
            if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)){
                throw new RuntimeException("Authoriation header missing from request!");
            }

            String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(1);
            String[] parts = authHeader.split(" ");

            if(parts.length != 2 || !"Bearer".equals(parts[0])){
                throw new RuntimeException("Wrong Authorization structure!");
            }
            
            Map<String, String> validationRequestBody = new HashMap<String, String>();
            validationRequestBody.put("token", parts[1]);

            return webClientBuilder.build()
                .post()
                .uri("http://auth-service/api/v1/auth/validate")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(validationRequestBody))
                .retrieve().bodyToMono(ValidationResponse.class)
                .map(validationResponse -> {
                    exchange.getRequest()
                            .mutate()
                            .headers(httpHeaders -> {
                                httpHeaders.set("x-auth-user-id", validationResponse.getEmail());
                                httpHeaders.set("x-auth-user-authorities", 
                                    validationResponse.getAuthorities()
                                        .stream()
                                            .map(String::valueOf)
                                                .collect(Collectors.joining(", ")));
                            });
                    return exchange;
                }).flatMap(chain::filter);
        };
    }

    public static class Config {

    }
}