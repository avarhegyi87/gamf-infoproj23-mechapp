package com.gmech.stock.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
public class StockController {

    private final StockService service;

    @PostMapping(value = "/create")
    public ResponseEntity<StockResponse> create(@RequestBody @Valid StockRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping(value = "/get")
    public ResponseEntity<StockResponse> get(@RequestParam String mater) {
        return ResponseEntity.ok(service.get(mater));
    }

    @GetMapping(value = "/getall")
    public ResponseEntity<List<StockResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping(value = "/put")
    public ResponseEntity<StockResponse> put(@RequestBody @Valid StockRequest request) {
        return ResponseEntity.ok(service.put(request));
    }

    @DeleteMapping(value = "/delete")
    public void delete(@RequestParam String materialNumber) {
        service.delete(materialNumber);
    }

}
