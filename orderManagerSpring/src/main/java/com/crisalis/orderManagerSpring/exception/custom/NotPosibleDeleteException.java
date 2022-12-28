package com.crisalis.orderManagerSpring.exception.custom;

public class NotPosibleDeleteException extends RuntimeException{

    private static final String DESCRIPTION = "Not posible (400)";

    public NotPosibleDeleteException(String error){
        super(DESCRIPTION + ". " + error);
    }
}
