package com.crisalis.orderManagerSpring.exception.custom;

public class EmptyElementException extends RuntimeException{

    private static final String DESCRIPTION = "Empty element (400)";
    public EmptyElementException(String error){
        super(DESCRIPTION + ". " + error);
    }
}
