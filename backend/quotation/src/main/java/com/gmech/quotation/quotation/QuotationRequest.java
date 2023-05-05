package com.gmech.quotation.quotation;

import java.util.List;
import java.util.ArrayList;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.gmech.quotation.job.JobDto;
import com.gmech.quotation.stock.StockDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuotationRequest {
   private Integer id;   
   private Integer vehicleId;
   private Integer customerId;
   //munkadij + alkatreszek
   private List<JobDto> jobs = new ArrayList<JobDto>();
   private List<StockDto> parts = new ArrayList<StockDto>();
}