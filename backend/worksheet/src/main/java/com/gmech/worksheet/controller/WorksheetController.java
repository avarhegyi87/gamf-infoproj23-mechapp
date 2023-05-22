package com.gmech.worksheet.controller;

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

import com.gmech.worksheet.service.WorksheetService;

import jakarta.validation.Valid;

import com.gmech.worksheet.worksheet.WorksheetRequest;
import com.gmech.worksheet.worksheet.WorksheetResponse;

@RestController
@RequestMapping(value = "/api/v1/worksheet")
@RequiredArgsConstructor
@Validated
public class WorksheetController {

    private final WorksheetService service;

    @PostMapping(value = "/create")
    public ResponseEntity<WorksheetResponse> create(@RequestBody @Valid WorksheetRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping(value = "/get")
    public ResponseEntity<WorksheetResponse> get(@RequestParam Integer id) {
        return ResponseEntity.ok(service.get(id));
    }

    @GetMapping(value = "/getall")
    public ResponseEntity<List<WorksheetResponse>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<Void> delete(@RequestParam Integer id) {
        service.delete(id);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }
}
