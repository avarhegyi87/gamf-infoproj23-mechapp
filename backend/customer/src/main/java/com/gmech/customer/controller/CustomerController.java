package com.gmech.customer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;
import jakarta.ws.rs.core.Response;

import com.gmech.customer.service.CustomerService;
import com.gmech.customer.customer.CustomerRequest;
import com.gmech.customer.customer.CustomerResponse;

@RestController
@RequestMapping(value = "/api/v1/customer")
@RequiredArgsConstructor
@Validated
public class CustomerController {
    
    private final CustomerService service;

    @PostMapping(value = "/create")
    public ResponseEntity<CustomerResponse> create(@RequestBody @Valid CustomerRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping(value = "/get")
    public ResponseEntity<CustomerResponse> get(@RequestParam Integer id) {
        return ResponseEntity.ok(service.get(id));
    }

    @GetMapping(value = "/getall")
    public ResponseEntity<CustomerResponse> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
