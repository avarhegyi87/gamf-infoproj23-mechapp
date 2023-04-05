package com.gmech.auth.authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationRequest {
    @NotBlank
    @Email(message = "A mezőnek email címet kell, hogy tartalmazzon!")
    private String email;
    private String password;
}
