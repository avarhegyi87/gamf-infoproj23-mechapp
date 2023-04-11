package com.gmech.stock.stock;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockResponse {

    private String materialNumber;
    private String description;
    private Integer currentStock;
    private Float netPrice;
}
