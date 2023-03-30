package com.gmech.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/test")
public class TestController {
    
    @GetMapping(value="/testendpoint")
    public ResponseEntity<Test> testFunction() {
        return ResponseEntity.ok(Test.builder().name("Krisztian").profession("CSE").build());
    }

}
