package com.gmech.quotation.quotation;

import java.util.List;

import org.hibernate.annotations.DynamicUpdate;

import java.util.ArrayList;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
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
@Entity
@DynamicUpdate
public class Quotation {
    
    @Id
    @GeneratedValue
    private Integer id;
    
    private Integer vehicleId;
    private Integer customerId;
    
    @ElementCollection
    private List<JobDto> jobs = new ArrayList<JobDto>();
    
    @ElementCollection
    private List<StockDto> parts = new ArrayList<StockDto>();
    
    private Integer combinedCosts;
    
}
