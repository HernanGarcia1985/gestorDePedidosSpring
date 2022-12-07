package com.crisalis.orderManagerSpring.exception.custom;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CrudException extends RuntimeException{

    private HttpStatus httpStatus;
    private String message;

    public CrudException(HttpStatus httpStatus, String message){
        super(message);
        this.httpStatus = httpStatus;
    }
}


