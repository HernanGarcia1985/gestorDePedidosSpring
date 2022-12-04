package com.crisalis.orderManagerSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.crisalis")
public class OrderManagerSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(OrderManagerSpringApplication.class, args);
	}

}
