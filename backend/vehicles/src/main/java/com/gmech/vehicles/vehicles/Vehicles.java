package com.gmech.vehicles.vehicles;

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
public class Vehicles {
    @Id
    @GeneratedValue
    private Integer id;

    private String vin;
    private String licenceplate;
    private Integer customerId;
    private Integer productionYear;
    private Integer mileage;
    private String carBrand;
    private String carMake;
    private Integer displacement;
    private String fuelType;

}
