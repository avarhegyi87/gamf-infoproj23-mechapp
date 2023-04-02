package com.gmech.worksheet.service;

import org.springframework.stereotype.Service;

import com.gmech.worksheet.worksheet.Worksheet;
import com.gmech.worksheet.worksheet.WorksheetRepository;
import com.gmech.worksheet.worksheet.WorksheetRequest;
import java.util.List;
import java.util.Date;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WorksheetService {
    
    private final WorksheetRepository repository;

    public Worksheet save(WorksheetRequest request) {
        
        var worksheet = Worksheet.builder()
            .mechanicId(request.getMechanicId())
            .customerId(request.getCustomerId())
            .vehicleId(request.getVehicleId())
            .workHours(request.getWorkHours())
            .comment(request.getComment())
            .quotationId(request.getQuotationId())
            .workStart(new Date())
            .workEnd(new Date())
            .garageId(request.getGarageId())
            .build();
        
        return repository.save(worksheet);
    }

    public List<Worksheet> getAll(){
        return repository.findAll();


    }
}
