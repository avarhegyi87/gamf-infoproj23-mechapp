package com.gmech.auth.validation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.Objects;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.gmech.auth.jwt.JwtService;
import com.gmech.auth.token.TokenRepository;

@Service
@RequiredArgsConstructor
public class ValidationService {
    
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserDetailsService userDetailsService;
     
    public ValidationResponse validate(ValidationRequest request){;
        final String jwt = request.getToken();
        final String userEmail = jwtService.extractUsername(jwt);
         
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);
        
        var isTokenValid = tokenRepository.findByToken(jwt)
            .map(t -> !t.isExpired() && !t.isRevoked())
            .orElse(false); 
        
        if(jwtService.isTokenValid(jwt, userDetails) && isTokenValid) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        return ValidationResponse.builder()
                .userName(((UserDetails)principal).getUsername())
                .authorities(((UserDetails)principal).getAuthorities()
                        .stream()
                            .map(object -> Objects.toString(object, null))
                                .toList())
                .build(); 
    }
}

