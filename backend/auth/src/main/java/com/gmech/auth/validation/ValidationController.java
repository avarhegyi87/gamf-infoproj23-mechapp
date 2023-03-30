package com.gmech.auth.validation;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping(value = "/api/v1/auth")
@RequiredArgsConstructor
public class ValidationController {

    private final ValidationService service;

    @PostMapping(value = "/validate")
    public ResponseEntity<ValidationResponse> validate(
      @RequestBody ValidationRequest request
    ) {
      return ResponseEntity.ok(service.validate(request));
    }
}