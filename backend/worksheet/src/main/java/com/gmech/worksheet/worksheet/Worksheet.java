package com.gmech.worksheet.worksheet;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

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
    private Integer customerId;
    private Integer vehicleId;
    private Integer workHours;
    private String comment;
    private Integer quotationId;
    private Date workStart;
    private Date workEnd;
    private Integer garageId;
}
