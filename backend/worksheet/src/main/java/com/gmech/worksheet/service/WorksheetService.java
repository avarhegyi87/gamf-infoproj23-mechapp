package com.gmech.worksheet.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

import com.gmech.worksheet.worksheet.Worksheet;
import com.gmech.worksheet.worksheet.WorksheetRepository;
import com.gmech.worksheet.worksheet.WorksheetRequest;
import com.gmech.worksheet.worksheet.WorksheetResponse;
import com.gmech.worksheet.worksheet.Worksheet;

import com.gmech.worksheet.exception.DuplicateException;
import com.gmech.worksheet.exception.IncorrectIdException;

@Service
@RequiredArgsConstructor
public class WorksheetService {

    private final WorksheetRepository worksheetRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public WorksheetResponse create(WorksheetRequest request) {
        worksheetRepository.findByQuotationId(request.getQuotationId()).ifPresent(q -> {
            throw new DuplicateException("Worksheet already exists for this quotation!");
        });

        var worksheet = Worksheet.builder()
                .mechanicId(request.getMechanicId())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .garageId(request.getGarageId())
                .quotationId(request.getQuotationId())
                .comment(request.getComment())
                .additionalJobs(request.getAdditionalJobs())
                .additionalParts(request.getAdditionalParts())
                .build();

        return this.modelMapper.map(
                worksheetRepository.save(worksheet),
                WorksheetResponse.class);
    }

    public WorksheetResponse get(Integer id) {
        var worksheet = worksheetRepository.findById(id)
                .orElseThrow(() -> new IncorrectIdException("Worksheet doesnt exists with given ID"));
        return this.modelMapper.map(
                worksheet,
                WorksheetResponse.class);
    }

    public List<WorksheetResponse> getAll() {
        var worksheets = worksheetRepository.findAll();
        return worksheets.stream().map(
                (sheet) -> this.modelMapper.map(sheet, WorksheetResponse.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public WorksheetResponse put(WorksheetRequest request) {
        var sheet = worksheetRepository.findById(request.getId())
                .orElseThrow(() -> new IncorrectIdException("Worksheet doesnt exists with given ID"));
        sheet.setStartDate(request.getStartDate());
        sheet.setEndDate(request.getEndDate());
        sheet.setComment(request.getComment());
        sheet.setAdditionalJobs(request.getAdditionalJobs());
        sheet.setAdditionalParts(request.getAdditionalParts());
        return this.modelMapper.map(worksheetRepository.save(sheet), WorksheetResponse.class);
    }

    public void delete(Integer id) {
        worksheetRepository.findById(id)
                .orElseThrow(() -> new IncorrectIdException("Worksheet doesnt exists with given ID"));

        worksheetRepository.deleteById(id);
    }

}