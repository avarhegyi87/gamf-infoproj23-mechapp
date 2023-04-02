package com.gmech.worksheet.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.gmech.worksheet.service.WorksheetService;
import com.gmech.worksheet.worksheet.Worksheet;
import com.gmech.worksheet.worksheet.WorksheetRequest;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/worksheet")
@RequiredArgsConstructor
public class WorksheetController {
    
    private final WorksheetService service;

    @PostMapping("/save")
    public ResponseEntity<Worksheet> save(@RequestBody WorksheetRequest request) {
        return ResponseEntity.ok(service.save(request));
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Worksheet>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
    
}
