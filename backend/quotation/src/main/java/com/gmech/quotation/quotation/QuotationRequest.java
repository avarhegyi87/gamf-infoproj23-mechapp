package com.gmech.quotation.quotation;

import java.util.List;
import java.util.ArrayList;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

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

   @NotNull
   @Max(99999)
   @Min(0)
   private Integer id;

   @NotNull
   @Max(99999)
   @Min(0)
   private Integer vehicleId;

   @NotNull
   @Max(99999)
   @Min(0)
   private Integer customerId;

   // munkadij + alkatreszek
   @NotNull
   private List<JobDto> jobs = new ArrayList<JobDto>();

   @NotNull
   private List<StockDto> parts = new ArrayList<StockDto>();
}
