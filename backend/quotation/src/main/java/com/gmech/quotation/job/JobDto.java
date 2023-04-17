package com.gmech.quotation.job;

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
public class JobDto {
    private Integer id; 
    private String category; 
    private String description; 
    private Integer estimatedTime; 
    private Integer netPrice;
}
