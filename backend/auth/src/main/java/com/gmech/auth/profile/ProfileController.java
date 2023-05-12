package com.gmech.auth.profile;

import java.util.Map;
import com.gmech.auth.profile.Profile;
import org.springframework.http.ResponseEntity;
import com.gmech.auth.profile.ProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService service;

    @GetMapping(value = "/show")
    public ResponseEntity<Profile> get(
            @RequestHeader Map<String, String> header) {
        return ResponseEntity.ok(service.getUserProfile(header));
    }
}
