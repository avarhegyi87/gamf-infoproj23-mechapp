package com.gmech.customer.customer;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Customer {
    @Id
    @GeneratedValue
    private Integer id;

    private String name;
    private String country;
    private String postCode;
    private String street;
    private String houseNumber;
    private String email;
    private String phoneNumber;
    private String taxNumber; 
}
