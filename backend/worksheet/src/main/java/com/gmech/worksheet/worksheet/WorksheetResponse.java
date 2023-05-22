package com.gmech.worksheet.worksheet;

import java.util.List;
import java.sql.Timestamp;
import java.util.ArrayList;

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
public class WorksheetResponse {

    private Integer id;
    private Integer mechanicId;
    private Timestamp startDate;
    private Timestamp endDate;
    private Integer garageId;
    private Integer quotationId;
    private String comment;

    // ajánlaton felüli plusz alkatrészek és munkadíjak
    private List<JobDto> additionalJobs = new ArrayList<JobDto>();
    private List<StockDto> additionalParts = new ArrayList<StockDto>();

}
