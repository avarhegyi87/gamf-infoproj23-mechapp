package com.gmech.worksheet.worksheet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.List;

import io.micrometer.common.lang.Nullable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorksheetResponse {
    
    private Integer mechanicId;
    private Integer customerId;
    private Integer vehicleId;
    private Integer workHours;
    private String comment;
    private Integer quotationId;
    private Date workStart;
    private Date workEnd;
    private Integer garageId;

    @Nullable
    private List<Worksheet> worksheets;
}
