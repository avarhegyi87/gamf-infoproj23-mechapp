package com.gmech.quotation.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gmech.quotation.quotation.QuotationRequest;
import com.gmech.quotation.quotation.QuotationResponse;
import com.gmech.quotation.service.QuotationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(value = "/api/v1/quotation")
@RequiredArgsConstructor
@Validated
public class QuotationController {

    private final QuotationService service;

    @PostMapping(value = "/create")
    public ResponseEntity<QuotationResponse> create(
        @RequestBody @Valid QuotationRequest request
    ) {
        return ResponseEntity.ok(service.create(request));
    }
}
