package com.crisalis.orderManagerSpring.exception.custom;

public class NotPosibleDeleteException extends RuntimeException{

    private static final String DESCRIPTION = "Could not delete (400)";

    public NotPosibleDeleteException(String error){
        super(DESCRIPTION + ". " + error);
    }
}
