package com.gmech.vehicles.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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

import com.gmech.vehicles.service.VehiclesService;

import jakarta.validation.Valid;

import com.gmech.vehicles.vehicles.VehiclesRequest;
import com.gmech.vehicles.vehicles.VehiclesRequestPut;
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

    @GetMapping(value = "/getallbycust")
    public ResponseEntity<List<VehiclesResponse>> getAllForCustomerId(@RequestParam Integer id) {
        return ResponseEntity.ok(service.getAllForCustomerId(id));
    }

    @PutMapping(value = "/put")
    public ResponseEntity<VehiclesResponse> put(@RequestBody @Valid VehiclesRequestPut request) {
        return ResponseEntity.ok(service.put(request));
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<Void> delete(@RequestParam Integer id) {
        service.delete(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
