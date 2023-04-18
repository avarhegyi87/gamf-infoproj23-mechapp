package com.gmech.quotation.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.service.annotation.DeleteExchange;

import com.gmech.quotation.quotation.QuotationRequest;
import com.gmech.quotation.quotation.QuotationResponse;
import com.gmech.quotation.service.QuotationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;


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

    @GetMapping(value = "/get")
    public ResponseEntity<QuotationResponse> get(@RequestParam Integer id) {
        return ResponseEntity.ok(service.get(id));
    }

    @GetMapping(value="/getAll")
    public ResponseEntity<List<QuotationResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping(value = "/put")
    public ResponseEntity<QuotationResponse> put(@RequestBody @Valid QuotationRequest request) {
        return ResponseEntity.ok(service.put(request));
    }
    
    @DeleteMapping(value = "/delete")
    public ResponseEntity<Void> delete(@RequestParam Integer id) {
        service.delete(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
