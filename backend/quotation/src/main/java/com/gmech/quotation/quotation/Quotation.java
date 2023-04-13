package com.gmech.quotation.quotation;

import java.util.List;
import java.util.ArrayList;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.gmech.quotation.stock.StockDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Quotation {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    private Integer vehicleId;
    private Integer customerId;
    
    //munkadij + alkatreszek
    private List<Integer> costs;
    
    @ElementCollection
    private List<StockDto> parts = new ArrayList<StockDto>();
    
    private Integer combinedCosts;
    
}
