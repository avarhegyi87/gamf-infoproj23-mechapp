package com.gmech.stock.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class IncorrectMatnumberException extends RuntimeException {

    public IncorrectMatnumberException(String arg0) {
        super(arg0);
    }
}
