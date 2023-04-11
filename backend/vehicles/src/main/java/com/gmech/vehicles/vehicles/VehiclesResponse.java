package com.gmech.vehicles.vehicles;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehiclesResponse {

    private Integer id;
    private String vin;
    private String licencePlate;
    private Integer customerId;
    private Integer productionYear;
    private Integer mileage;
    private String carBrand;
    private String carMake;
    private Integer displacement;
    private String fuelType;
}
