package com.crisalis.orderManagerSpring.service.impl;

import com.crisalis.orderManagerSpring.dto.CustomerDto;
import com.crisalis.orderManagerSpring.dto.OrderDetailDto;
import com.crisalis.orderManagerSpring.exception.custom.EmptyElementException;
import com.crisalis.orderManagerSpring.exception.custom.NotFoundException;
import com.crisalis.orderManagerSpring.exception.custom.NotPosibleDeleteException;
import com.crisalis.orderManagerSpring.model.*;
import com.crisalis.orderManagerSpring.repository.CompanyRepository;
import com.crisalis.orderManagerSpring.repository.CustomerAssetServiceRepository;
import com.crisalis.orderManagerSpring.repository.OrderRepository;
import com.crisalis.orderManagerSpring.repository.PersonRepository;
import com.crisalis.orderManagerSpring.service.CustomerService;
import com.crisalis.orderManagerSpring.service.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CompanyRepository companyRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    CustomerMapper customerMapper;

    @Autowired
    OrderAssetDetailServiceImpl orderAssetDetailServiceImpl;

    @Autowired
    CustomerAssetServiceRepository customerAssetServiceRepository;

    @Autowired
    OrderRepository orderRepository;

    @Override
    public CustomerDto getCustomerById(Integer id) {
        Optional<Company> company = companyRepository.findById(id);
        List<CustomerAssetService> customerAssetServiceList;
        if(company.isPresent()){
            customerAssetServiceList = customerAssetServiceRepository.findByCompanyId(company.get().getId());
            return customerMapper.companyToDto(company.get(), customerAssetServiceList);
        }
        Optional<Person> person = personRepository.findById(id);
        if(person.isPresent()){
            customerAssetServiceList = customerAssetServiceRepository.findByPersonId(person.get().getId());
            return customerMapper.personToDto(person.get(), customerAssetServiceList);
        }
        throw new NotFoundException("Customer not found");
    }

    @Override
    public CustomerDto createCustomer (CustomerDto customerDto){
        String customerType = customerDto.getCustomerType().toLowerCase();
        if (customerType.equals("company")){
            Person personInCharge = new Person(customerDto.getName(), customerDto.getLastName(), customerDto.getDni());
            Person newPersonInCharge = personRepository.save(personInCharge);
            Company company = customerMapper.companyDtoToEntity(customerDto, newPersonInCharge);
            Company newCompany = companyRepository.save(company);
            return customerMapper.companyToDto(newCompany, new ArrayList<>());
        } else if (customerType.equals("person")) {
            Person person = customerMapper.personDtoToEntity(customerDto);
            Person newPerson = personRepository.save(person);
            return customerMapper.personToDto(newPerson, new ArrayList<>());
        }
        throw new EmptyElementException("Customer type is not specified");
    }

    @Override
    public List<CustomerDto> getAllCustomers() {
        List<CustomerDto> allCompanies = companyRepository.findAll()
                .stream()
                .map(company -> customerMapper.companyToDto(company, null))
                .collect(Collectors.toList());

        List<CustomerDto> allPersons = personRepository.findAll()
                .stream()
                .map(person -> customerMapper.personToDto(person, null))
                .collect(Collectors.toList());

        List<CustomerDto> allCustomers = new ArrayList<>();

        allCustomers.addAll(allCompanies);
        allCustomers.addAll(allPersons);

        return allCustomers;
    }

    @Override
    public void destroyCustomer(Integer id) {
        List<CustomerAssetService> customerAssetServiceList;
        if(companyRepository.existsById(id)){
            customerAssetServiceList = customerAssetServiceRepository.findByCompanyId(id);
            if (!customerAssetServiceList.isEmpty()) throw new NotPosibleDeleteException("It is not possible to delete Company with id "+id+" because it has active services.");
            companyRepository.deleteById(id);
            //delete personInCharge if Person does not have service active or address empty
            //because it not a customer itself
        } else if (personRepository.existsById(id)) {
            List<Integer> companiesIds = findCompaniesWithPersonInCharge(id);
            customerAssetServiceList = customerAssetServiceRepository.findByPersonId(id);
            if(companiesIds.isEmpty()){
                if(!customerAssetServiceList.isEmpty()) throw new NotPosibleDeleteException("It is not possible to delete Person with id "+id+" because it has active services.");
                personRepository.deleteById(id);
            } else {
                throw new NotPosibleDeleteException("It is not possible to delete Person with id "+id+" because it is the person responsible for the companies with ids: "+companiesIds);
            }
            //is personInCharge ? Not posible : delete
        } else {
            throw new NotFoundException("Customer with id "+id+" does not exist");
        }
    }

    @Override
    public List<Integer> findCompaniesWithPersonInCharge(Integer id) {
        List<Company> companies = companyRepository.findAll()
                .stream()
                .filter(company -> company.getPerson().getId().equals(id))
                .collect(Collectors.toList());

        return companies.stream()
                .map(Customer::getId)
                .collect(Collectors.toList());
    }

    @Override
    public CustomerDto updateCustomerById(Integer id, CustomerDto customerModified) {
        List<CustomerAssetService> customerAssetServiceList;
        if(customerModified.getCustomerType().equalsIgnoreCase("company")){
            if(companyRepository.existsById(id)){
                customerAssetServiceList = customerAssetServiceRepository.findByCompanyId(id);
                Person personInCharge = null;
                if(customerModified.getUpdatePersonInCharge()){
                    Person personModified = new Person(customerModified.getName(), customerModified.getLastName(), customerModified.getDni());
                    personInCharge = personRepository.save(personModified);
                } else {
                    Optional<Company> company = companyRepository.findById(id);
                    if (company.isPresent()){
                        Integer idPerson = company.get().getPerson().getId();
                        personInCharge = customerMapper.personDtoToEntity(updatePerson(idPerson, customerModified));
                        //Borrar address. mail y phone
                        personInCharge.setId(idPerson);
                    }
                }
                Company customerUpdated = customerMapper.companyDtoToEntity(customerModified, personInCharge);
                customerUpdated.setId(id);
                companyRepository.save(customerUpdated);
                return customerMapper.companyToDto(customerUpdated, customerAssetServiceList);
            }
        } else if (customerModified.getCustomerType().equalsIgnoreCase("person")){
            return updatePerson(id, customerModified);
        }
        throw new NotFoundException("Customer with id "+id+" does not exist");
    }

    @Override
    public CustomerDto updatePerson(Integer id, CustomerDto personModified) {
        List<CustomerAssetService> customerAssetServiceList;
        if (personRepository.existsById(id)) {
            customerAssetServiceList = customerAssetServiceRepository.findByPersonId(id);
            Person customerUpdated = customerMapper.personDtoToEntity(personModified);
            customerUpdated.setId(id);
            personRepository.save(customerUpdated);
            return customerMapper.personToDto(customerUpdated, customerAssetServiceList);
        }
        throw new NotFoundException("Person with id "+id+" does not exist");
    }

    @Override
    public List<CustomerAssetService> assignServices(Integer idCustomer, OrderDetailDto orderDetailDto) {
        List<CustomerAssetService> customerAssetServiceList = new ArrayList<>();
        List<OrderAssetDetail> orderServiceList;
        Optional<Company> company = companyRepository.findById(idCustomer);
        Optional<Person> person = personRepository.findById(idCustomer);

        if(company.isEmpty() && person.isEmpty()) throw new NotFoundException("Customer with id: "+ idCustomer + " does not exists");

        if(company.isPresent()) {
            if(orderDetailDto.getCompany() == null) throw new NotFoundException("The order with id "+ orderDetailDto.getId() +" does not belong to the customer with id "+ idCustomer);
            if(!orderDetailDto.getCompany().getId().equals(company.get().getId())) throw new NotFoundException("The order with id "+ orderDetailDto.getId() +" does not belong to the customer with id "+ idCustomer);
        }

        if(person.isPresent()) {
            if(orderDetailDto.getPerson() == null) throw new NotFoundException("The order with id "+ orderDetailDto.getId() +" does not belong to the customer with id "+ idCustomer);
            if(!orderDetailDto.getPerson().getId().equals(person.get().getId())) throw new NotFoundException("The order with id "+ orderDetailDto.getId() +" does not belong to the customer with id "+ idCustomer);
        }

        if(!orderDetailDto.getStatus()) throw new NotFoundException("Order with id: "+ orderDetailDto.getId() + " is annuled");

        if(customerAssetServiceRepository.existsByOrderId(orderDetailDto.getId())) throw new NotFoundException("The services of the order with id: "+ orderDetailDto.getId() + " have already been associated before.");

        Optional<Order> order = orderRepository.findById(orderDetailDto.getId());
        List<OrderAssetDetail> orderAssetDetailList = orderAssetDetailServiceImpl.getAllOrderAssetDetailByOrderId(orderDetailDto.getId());
        if (orderAssetDetailList.isEmpty() || orderAssetDetailList == null){
            throw new NotFoundException("No assets associated with this order");
        }
        orderServiceList = orderAssetDetailList.stream()
                .filter(orderAssetDetail -> orderAssetDetail.getOwnService() != null)
                .collect(Collectors.toList());
        if(orderServiceList.isEmpty()){
            throw new NotFoundException("No services associated with this order");
        }
        for (int i=0; i<orderServiceList.size(); i++) {
            CustomerAssetService customerAssetService = new CustomerAssetService(
                    null,
                    LocalDate.now(),
                    true,
                    order.orElse(null),
                    company.orElse(null),
                    person.orElse(null),
                    orderServiceList.get(i).getOwnService()
            );
            customerAssetServiceList.add(i, customerAssetServiceRepository.save(customerAssetService));
        }
        return customerAssetServiceList;
    }

}
