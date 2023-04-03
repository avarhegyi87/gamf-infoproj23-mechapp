package com.gmech.auth.validation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class ValidationController {

    private final ValidationService service;

    @PostMapping(value = "/validate")
    public ResponseEntity<ValidationResponse> validate(
      @RequestParam(name = "token", required = true) String token
    ) {
      return ResponseEntity.ok(service.validate(token));
    }
}