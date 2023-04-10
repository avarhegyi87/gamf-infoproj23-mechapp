package com.gmech.vehicles.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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

    @GetMapping(value = "/get")
    public ResponseEntity<VehiclesResponse> get(@RequestParam Integer id) {
        return ResponseEntity.ok(service.get(id));
    }

    @GetMapping(value = "/getall")
    public ResponseEntity<List<VehiclesResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}
