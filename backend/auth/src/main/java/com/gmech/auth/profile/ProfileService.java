package com.gmech.auth.profile;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import com.gmech.auth.user.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final UserRepository userRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public Profile getUserProfile(Map<String, String> header) {
        var profile = userRepository.findByEmail(header.get("x-auth-user-id"));

        return this.modelMapper.map(
                profile,
                Profile.class);
    }
}
