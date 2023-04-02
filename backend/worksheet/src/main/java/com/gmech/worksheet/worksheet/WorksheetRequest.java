package com.gmech.worksheet.worksheet;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorksheetRequest {
    
    private Integer mechanicId;
    private Integer customerId;
    private Integer vehicleId;
    private Integer workHours;
    private String comment;
    private Integer quotationId;
    private Date workStart;
    private Date workEnd;
    private Integer garageId;
}