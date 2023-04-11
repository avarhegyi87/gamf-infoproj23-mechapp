package com.gmech.vehicles.vehicles;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.PastOrPresent;

import java.time.Year;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VehiclesRequestPut {

    @NotNull
    @Digits(integer = 7, fraction = 0, message = "Az azonosítónak számnak kell lennie!")
    private Integer id;

    @NotBlank
    @Size(min = 17, max = 17, message = "Az alvázszám 17 karakter hosszú lehet!")
    private String vin;

    @NotBlank
    @Size(min = 6, max = 7, message = "A rendszám 6 vagy 7 karakter hosszú lehet!")
    private String licencePlate;

    @NotNull
    @Digits(integer = 7, fraction = 0, message = "A tulajdonos azonosítónak számnak kell lennie!")
    private Integer customerId;

    @NotNull
    @Max(2023)
    @Min(1900)
    private Integer productionYear;

    @NotNull
    @Digits(integer = 7, fraction = 0, message = "A futásteljesítménynek számnak kell lennie!")
    private Integer mileage;

    @NotBlank
    @Size(min = 3, max = 20, message = "A gyártmány megnevezése 3-tól 20 karakter hosszú lehet!")
    private String carBrand;

    @NotBlank
    @Size(min = 3, max = 20, message = "A típus megnevezése 3-tól 20 karakter hosszú lehet!")
    private String carMake;

    @NotNull
    @Digits(integer = 5, fraction = 0, message = "A hengerűrtartalomnak számnak kell lennie!")
    private Integer displacement;

    @NotBlank
    @Size(min = 3, max = 10, message = "Az üzemanyag típus megnevezése 3-tól 10 karakter hosszú lehet!")
    private String fuelType;

}
