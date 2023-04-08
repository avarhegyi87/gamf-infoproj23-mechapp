package com.gmech.customer.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.customer.customer.Customer;
import com.gmech.customer.customer.CustomerRepository;
import com.gmech.customer.customer.CustomerRequest;
import com.gmech.customer.customer.CustomerResponse;
import com.gmech.customer.exception.DuplicateException;
import com.gmech.customer.exception.IncorrectIdException;

@Service
@RequiredArgsConstructor
public class CustomerService {
    
    private final CustomerRepository customerRepository;
    
    @Autowired
    private final ModelMapper modelMapper;

    public CustomerResponse create(CustomerRequest request) {
        customerRepository.findByEmail(request.getEmail()).ifPresent(c -> {
            throw new DuplicateException("A megadott email címmel már rendelkezik ügyfél!");
        });

        customerRepository.findByName(request.getName()).ifPresent(c -> {
            throw new DuplicateException("A megadott névvel már rendelkezik ügyfél!");
        });

        customerRepository.findByPhoneNumber(request.getPhoneNumber()).ifPresent(c -> {
            throw new DuplicateException("A megadott telefonszámmal már rendelkezik ügyfél!");
        });

        var customer = Customer.builder()
            .name(request.getName())
            .country(request.getCountry())
            .postCode(request.getPostCode())
            .street(request.getStreet())
            .houseNumber(request.getHouseNumber())
            .email(request.getEmail())
            .phoneNumber(request.getPhoneNumber())
            .taxNumber(request.getTaxNumber())
            .build();

        return this.modelMapper.map(
            customerRepository.save(customer), 
            CustomerResponse.class
        );
    }

    public CustomerResponse get(Integer id) {
        var customer = customerRepository.findById(id)
            .orElseThrow(() -> new IncorrectIdException("A megadott aznosító nem létezik!"));
        return this.modelMapper.map(
            customer,
            CustomerResponse.class  
        );
    }
}
