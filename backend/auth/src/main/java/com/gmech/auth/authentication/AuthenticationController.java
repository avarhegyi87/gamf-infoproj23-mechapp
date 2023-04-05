package com.gmech.auth.authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
@Validated
public class AuthenticationController {
    
    private final AuthenticationService service;

    @PostMapping(value = "/register")
    public ResponseEntity<AuthenticationResponse> register (
        @RequestBody @Valid RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping(value = "/login")
    public ResponseEntity<AuthenticationResponse> login (
        @RequestBody @Valid AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

}
