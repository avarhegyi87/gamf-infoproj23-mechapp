package com.gmech.quotation.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmech.quotation.quotation.QuotationRepository;
import com.gmech.quotation.quotation.QuotationRequest;
import com.gmech.quotation.quotation.QuotationResponse;

import jakarta.transaction.Transactional;

import com.gmech.quotation.exception.DuplicateException;
import com.gmech.quotation.exception.IncorrectIdException;
import com.gmech.quotation.quotation.Quotation;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class QuotationService {

    private final QuotationRepository repository;

    @Autowired
    private final ModelMapper modelMapper;

    public QuotationResponse create(QuotationRequest request) {
        repository.findByVehicleId(request.getVehicleId()).ifPresent(q -> {
            throw new DuplicateException("Quotation already exists for this vehicle!");
        });

        var quotation = Quotation.builder()
            .customerId(request.getCustomerId())
            .vehicleId(request.getVehicleId())
            .jobs(request.getJobs())
            .parts(request.getParts())
            .combinedCosts(
                request.getJobs().stream().mapToInt(np -> np.getNetPrice() * np.getEstimatedTime()).sum() 
                    + 
                request.getParts().stream().mapToInt(np -> np.getNetPrice() * np.getQuantity()).sum())
            .build();

        return this.modelMapper.map(
            repository.save(quotation), 
            QuotationResponse.class);
    }

    public QuotationResponse get(Integer id) {
        var quotation = repository.findById(id)
            .orElseThrow(() -> new IncorrectIdException("Quotation doesnt exists with given ID"));
        return this.modelMapper.map(
            quotation, 
            QuotationResponse.class);
    }

    public List<QuotationResponse> getAll() {
        var quotations = repository.findAll();
        return quotations.stream().map(
            (quota) -> this.modelMapper.map(quota, QuotationResponse.class))
                .collect(Collectors.toList());
    }

    @Transactional
    public QuotationResponse put(QuotationRequest request) {
        var quota = repository.findById(request.getId())
            .orElseThrow(() -> new IncorrectIdException("Quotation doesnt exists with given ID"));
        quota.setJobs(request.getJobs());
        quota.setParts(request.getParts());
        quota.setCombinedCosts(
            request.getJobs().stream().mapToInt(np -> np.getNetPrice() * np.getEstimatedTime()).sum() 
                + 
            request.getParts().stream().mapToInt(np -> np.getNetPrice() * np.getQuantity()).sum());
        return this.modelMapper.map(repository.save(quota), QuotationResponse.class);
    }

    public void delete(Integer id) {
        repository.findById(id)
            .orElseThrow(() -> new IncorrectIdException("Quotation doesnt exists with given ID"));
        
        repository.deleteById(id);
    }
}
