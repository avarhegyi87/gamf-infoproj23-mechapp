package com.gmech.quotation.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmech.quotation.quotation.QuotationRepository;
import com.gmech.quotation.quotation.QuotationRequest;
import com.gmech.quotation.quotation.QuotationResponse;
import com.gmech.quotation.quotation.Quotation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final QuotationRepository repository;

    @Autowired
    private final ModelMapper modelMapper;

    public QuotationResponse create(QuotationRequest request) {
        var quotation = Quotation.builder()
        .test(request.getTest())
        .build();

        return this.modelMapper.map(
            repository.save(quotation), 
            QuotationResponse.class);
    }
}
