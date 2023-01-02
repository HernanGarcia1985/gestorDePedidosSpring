package com.crisalis.orderManagerSpring.controller;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.service.impl.CustomerServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customers")
public class CustomerController {


    private final CustomerServiceImpl customerServiceImpl;

    public CustomerController(CustomerServiceImpl customerServiceImpl){
        this.customerServiceImpl = customerServiceImpl;
    }

    @GetMapping(value = "/{id}" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getCustomerById(@PathVariable(value="id") Integer id){
            return ResponseEntity.status(HttpStatus.OK)
                    .body(customerServiceImpl.getCustomerById(id));
    }

    @PostMapping(value = "" , consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> createCustomer(@RequestBody CustomerDto customerDto) {
        try{
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(customerServiceImpl.createCustomer(customerDto));
        } catch (Exception exception){
            throw new RuntimeException();
        }
    }

    @GetMapping(value = "" , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllCustomers(){
        List<CustomerDto> customerList = customerServiceImpl.getAllCustomers();
        if (customerList.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No customers found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(customerList);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> destroyCustomer(@PathVariable(value = "id") Integer id){
        customerServiceImpl.destroyCustomer(id);
        return ResponseEntity.status(HttpStatus.OK).body("Customer with id "+id+" was deleted successfully!");
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateCustomer(@PathVariable(value = "id") Integer id, @RequestBody CustomerDto customerModified){
        CustomerDto customerUpdated = customerServiceImpl.updateCustomerById(id, customerModified);
        return ResponseEntity.status(HttpStatus.OK).body(customerUpdated);
    }
}
