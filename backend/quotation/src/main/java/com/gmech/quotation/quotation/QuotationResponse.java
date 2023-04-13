package com.gmech.quotation.quotation;

import java.util.List;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.gmech.quotation.stock.StockDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuotationResponse {
    
    private Integer id;
    private Integer vehicleId;
    private Integer customerId;
    //munkadij + alkatreszek
    private List<Integer> costs;
    private List<StockDto> parts = new ArrayList<StockDto>();
    private Integer combinedCosts;
}
