package com.gmech.stock.stock;

import jakarta.persistence.Entity;
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
public class Stock {

    @Id
    private String materialNumber;

    private String description;
    private Integer currentStock;
    private Float netPrice;
}
