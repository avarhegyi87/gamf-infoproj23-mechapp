package com.gmech.worksheet.worksheet;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.gmech.worksheet.job.JobDto;
import com.gmech.worksheet.stock.StockDto;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Worksheet {
    @Id
    @GeneratedValue
    private Integer id;
    private Integer mechanicId;
    private Timestamp startDate;
    private Timestamp endDate;
    private Integer garageId;
    private Integer quotationId;
    private String comment;

    @ElementCollection
    private List<JobDto> additionalJobs = new ArrayList<JobDto>();

    @ElementCollection
    private List<StockDto> additionalParts = new ArrayList<StockDto>();

}
