package com.gmech.customer.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import jakarta.validation.Valid;

import com.gmech.customer.service.CustomerService;
import com.gmech.customer.customer.CustomerRequest;
import com.gmech.customer.customer.CustomerRequestPut;
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
    public ResponseEntity<List<CustomerResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @PutMapping(value = "/put")
    public ResponseEntity<CustomerResponse> put(@RequestBody @Valid CustomerRequestPut request) {
        return ResponseEntity.ok(service.put(request));
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<Void> delete(@RequestParam Integer id) {
        service.delete(id);
        //204-es kód - no content ha sikerült a törlés, voidból fronton nem veszünk ki semmit :D
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
