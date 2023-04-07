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
    private String licenceplate;
    private Integer owner;
    private Integer production_year;
    private Integer mileage;
    private String car_brand;
    private String car_make;
    private Integer displacement;
    private String fuel_type;
}
