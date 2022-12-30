package com.crisalis.orderManagerSpring.exception.custom;

public class NotFoundException extends RuntimeException{

    private static final String DESCRIPTION = "Not found element (404)";

    public NotFoundException(String error){
        super(DESCRIPTION + ". " + error);
    }
}
