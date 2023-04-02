package com.gmech.auth.authentication;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.auth.exception.DuplicateException;
import com.gmech.auth.exception.IncorrectCredentialsException;
import com.gmech.auth.jwt.JwtService;
import com.gmech.auth.token.TokenRepository;
import com.gmech.auth.token.TokenType;
import com.gmech.auth.user.UserRepository;

import com.gmech.auth.token.Token;
import com.gmech.auth.user.Role;
import com.gmech.auth.user.User;


@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        //ha már létezik ilyen email az adatbázisban, akkor HttpStatus.UNPROCESSABLY_ENTITY(422-es kód)
        userRepository.findByEmail(request.getEmail()).ifPresent(u -> {
            throw new DuplicateException("Az email már használatban van!");
        });

        var user = User.builder()
            .email(request.getEmail())
            .firstName(request.getFirstName())
            .lastName(request.getLastName())
            .password(passwordEncoder.encode(request.getPassword()))
            .role(Role.Mechanic)
            .build();

        userRepository.save(user);
        var token = jwtService.generateToken(user);
        saveUserToken(user, token);
    
        return AuthenticationResponse.builder()
            .token(token)
            .build();
    }
    
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //ha nem létezik ilyen email az adatbázisban, akkor HttpStatus.NOT_FOUND(404-es kód)
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new IncorrectCredentialsException("Hibás email!"));
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
    
        var jwtToken = jwtService.generateToken(user);
        revokeUserTokens(user);
        saveUserToken(user, jwtToken);
    
        return AuthenticationResponse.builder()
            .token(jwtToken)
            .build();
    
    }

    private void saveUserToken(User user, String jwt) {
        var token = Token.builder()
            .user(user)
            .token(jwt)
            .tokenType(TokenType.Bearer)
            .revoked(false)
            .expired(false)
            .build();
        tokenRepository.save(token);
    }

    private void revokeUserTokens(User user) {
        var userTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if(userTokens.isEmpty()) { return; }
        userTokens.forEach(token -> {
            token.setRevoked(true);
            token.setExpired(true);
        });
        tokenRepository.saveAll(userTokens);
    }

}
