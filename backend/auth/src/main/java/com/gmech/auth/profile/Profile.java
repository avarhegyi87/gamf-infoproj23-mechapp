package com.gmech.auth.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private Integer id;

    private String email;
    private String firstName;
    private String lastName;
    private String password;
}
