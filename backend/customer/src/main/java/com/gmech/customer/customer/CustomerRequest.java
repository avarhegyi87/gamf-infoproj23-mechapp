package com.gmech.customer.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerRequest {
    private String name;
    private String country;
    private String postCode;
    private String street;
    private String houseNumber;
    private String email;
    private String phoneNumber;
    private Integer taxNumber; 
}
