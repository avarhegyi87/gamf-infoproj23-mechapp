package com.gmech.auth.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class IncorrectCredentialsException extends RuntimeException {
    
    public IncorrectCredentialsException(String arg0) {
        super(arg0);
    }
}
