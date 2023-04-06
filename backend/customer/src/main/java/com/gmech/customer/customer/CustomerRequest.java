package com.gmech.customer.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    
    @NotBlank
    @Size(min = 8, max = 16, message = "A névnek 8-16 karakternek kell lennie")
    private String name;
    
    @NotBlank
    @Size(min = 8, max = 16, message = "Az országnévnek 4-20 karakternek kell lennie")    
    private String country;
    
    @NotBlank
    @Size(min = 4, max = 4, message = "Az irányítószámnak 4 karakternek kell lennie")
    private String postCode;
    
    @NotBlank
    @Size(min = 4, max = 16, message = "Az utcanévnek 4-16 karakternek kell lennie")    
    private String street;
    
    @NotBlank
    @Size(min = 1, max = 10, message = "Az házszámnak 1-10 karakternek kell lennie")    
    private String houseNumber;
    
    @NotBlank
    @Email
    private String email;
    
    // telefonszám és ország hívó szám előtte, 11 karakter hosszúságra összes pl:
    // +36 70 123 4567
    // +111 (202) 555-0125 (., space, - támogatott a formátumnál)
    @NotBlank
    @Pattern(regexp = "^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$", message = "Helytelen telefonszám!")    
    private String phoneNumber;
        
    @Pattern(regexp = "^\\d{11}$", message = "Az adószám pontosan 11 számjegyből áll!")
    private Integer taxNumber; 
}