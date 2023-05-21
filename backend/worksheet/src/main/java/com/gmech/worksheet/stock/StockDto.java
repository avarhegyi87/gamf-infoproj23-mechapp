package com.gmech.worksheet.stock;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class StockDto {
    private String materialNumber;
    private Integer quantity;
    private Integer netPrice;
}
