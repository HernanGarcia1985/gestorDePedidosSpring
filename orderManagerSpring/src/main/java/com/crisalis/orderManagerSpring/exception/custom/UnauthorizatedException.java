package com.crisalis.orderManagerSpring.exception.custom;

public class UnauthorizatedException extends RuntimeException{

    private static final String DESCRIPTION = "Credentials Invalid (401)";
    public UnauthorizatedException(String error){
        super(DESCRIPTION + ". " + error);
    }
}
