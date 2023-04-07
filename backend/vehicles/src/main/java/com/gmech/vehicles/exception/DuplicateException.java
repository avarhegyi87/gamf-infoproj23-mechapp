package com.gmech.vehicles.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNPROCESSABLE_ENTITY)
public class DuplicateException extends RuntimeException {

    public DuplicateException(String arg0) {
        super(arg0);
    }
}
