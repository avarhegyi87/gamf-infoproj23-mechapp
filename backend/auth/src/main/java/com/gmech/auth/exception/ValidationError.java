package com.gmech.auth.exception;

import java.util.Map;
import org.springframework.http.HttpStatus;

public class ValidationError {

    private HttpStatus status;
    private String message;
    private Map<String, String> errors;

    public ValidationError(HttpStatus status, String message, Map<String, String> errors) {
        super();
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    public HttpStatus getStatus(){
        return status;
    }

    public Map<String, String> getErrors() {
        return errors;
    }
}
