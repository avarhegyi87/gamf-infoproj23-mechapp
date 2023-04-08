package com.gmech.stock.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import com.gmech.stock.service.StockService;

import jakarta.validation.Valid;

import com.gmech.stock.stock.StockRequest;
import com.gmech.stock.stock.StockResponse;

@RestController
@RequestMapping(value = "/api/v1/stock")
@RequiredArgsConstructor
@Validated
public class VehiclesController {

    private final StockService service;

    @PostMapping(value = "/create")
    public ResponseEntity<StockResponse> create(@RequestBody @Valid StockRequest request) {
        return ResponseEntity.ok(service.create(request));
    }
}
