package com.crisalis.orderManagerSpring.exception.custom;

public class EmptyElementException extends RuntimeException{
    public EmptyElementException(String error){
        super(error);
    }
}
