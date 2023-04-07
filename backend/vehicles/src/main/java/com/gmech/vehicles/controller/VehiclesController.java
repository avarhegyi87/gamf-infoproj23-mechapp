package com.gmech.vehicles.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import com.gmech.vehicles.service.VehiclesService;

import jakarta.validation.Valid;

import com.gmech.vehicles.vehicles.VehiclesRequest;
import com.gmech.vehicles.vehicles.VehiclesResponse;

@RestController
@RequestMapping(value = "/api/v1/vehicles")
@RequiredArgsConstructor
@Validated
public class VehiclesController {

    private final VehiclesService service;

    @PostMapping(value = "/create")
    public ResponseEntity<VehiclesResponse> create(@RequestBody @Valid VehiclesRequest request) {
        return ResponseEntity.ok(service.create(request));
    }
}
