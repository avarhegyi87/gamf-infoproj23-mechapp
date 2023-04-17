package com.gmech.quotation.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class IncorrectIdException extends RuntimeException {
    
    public IncorrectIdException(String arg0) {
        super(arg0);
    }
}
