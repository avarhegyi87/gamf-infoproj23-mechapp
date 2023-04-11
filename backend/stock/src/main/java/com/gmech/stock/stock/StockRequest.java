package com.gmech.stock.stock;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class StockRequest {

    @NotBlank
    @Size(min = 6, max = 18, message = "A cikkszám hosszúsága 6 és 18 karakter között lehet!")
    private String materialNumber;

    @NotBlank
    @Size(min = 6, max = 50, message = "A leírás hosszúsága 6 és 50 karakter között lehet!")
    private String description;

    @NotNull
    @Digits(integer = 4, fraction = 0, message = "A készletnek számnak kell lennie!")
    private Integer currentStock;

    @NotNull
    @Digits(integer = 7, fraction = 2, message = "A készletnek számnak kell lennie!")
    private Float netPrice;

}
