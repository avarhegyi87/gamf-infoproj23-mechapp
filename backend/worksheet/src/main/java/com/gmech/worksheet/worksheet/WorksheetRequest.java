package com.gmech.worksheet.worksheet;

import java.util.List;

import com.gmech.worksheet.job.JobDto;
import com.gmech.worksheet.stock.StockDto;

import java.sql.Timestamp;
import java.util.ArrayList;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorksheetRequest {

    @NotNull
    @Max(99999)
    @Min(0)
    private Integer id;

    @NotNull
    @Max(99999)
    @Min(0)
    private Integer mechanicId;

    @NotNull
    private Timestamp startDate;

    @NotNull
    private Timestamp endDate;

    @NotNull
    @Max(2)
    @Min(0)
    private Integer garageId;

    @NotNull
    @Max(99999)
    @Min(0)
    private Integer quotationId;

    @NotBlank
    @Size(min = 0, max = 255, message = "A megjegyzés legfeljebb 255 karakter hosszú lehet!")
    private String comment;

    // ajánlaton felüli plusz alkatrészek és munkadíjak
    private List<JobDto> additionalJobs = new ArrayList<JobDto>();
    private List<StockDto> additionalParts = new ArrayList<StockDto>();

}
