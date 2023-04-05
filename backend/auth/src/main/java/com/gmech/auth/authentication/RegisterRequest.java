package com.gmech.auth.authentication;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min = 4, max = 10, message = "A keresztnévnek 4-10 karakternek kell lennie!")
    private String firstName;
    
    @NotBlank
    @Size(min = 4, max = 10, message = "A vezetéknévnek 4-10 karakternek kell lennie!")
    private String lastName;

    @NotBlank
    @Pattern(
        regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}", 
        message = "A jelszónak tartalmaznia kell legalább egy kisbetűt, egy nagy betűt, egy speciális karaktert és legalább 8 karakterből kell, hogy álljon"
    )
    private String password;
}