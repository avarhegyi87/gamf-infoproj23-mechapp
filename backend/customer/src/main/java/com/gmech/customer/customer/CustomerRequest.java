package com.gmech.customer.customer;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Digits;
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
    @Size(min = 3, max = 40, message = "A név hosszúsága 3 és 40 karakter között lehet!")
    private String name;

    @NotBlank
    @Size(min = 3, max = 16, message = "Az országnév hosszúsága 3 és 20 karakter között lehet!")
    private String country;

    @NotNull
    @Digits(integer = 5, fraction = 0, message = "Az irányítószámnak számnak kell lennie (maximum 5 számjegy)!")
    private Integer postCode;

    @NotBlank
    @Size(min = 3, max = 25, message = "Az utcanév hosszúsága 3 és 25 karakter között lehet!")
    private String street;

    @NotBlank
    @Size(min = 1, max = 5, message = "A házszám hosszúsága 3 és 40 karakter között lehet!")
    private String houseNumber;

    @NotBlank
    @Email(message = "Kérjük a formátumnak megfelelő e-mail címet adjon meg!")
    private String email;

    // telefonszám és ország hívó szám előtte, 11 karakter hosszúságra összes pl:
    // +36 70 123 4567
    // +111 (202) 555-0125 (., space, - támogatott a formátumnál)
    @NotBlank
    @Pattern(regexp = "^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$", message = "Helytelen telefonszám!")
    private String phoneNumber;

    @NotNull
    @Digits(integer = 11, fraction = 0, message = "Az adószám pontosan 11 számjegyből áll!")
    private Long taxNumber;
}