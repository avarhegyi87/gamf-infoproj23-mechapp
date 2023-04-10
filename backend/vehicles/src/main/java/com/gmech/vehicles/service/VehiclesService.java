package com.gmech.vehicles.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.vehicles.vehicles.Vehicles;
import com.gmech.vehicles.vehicles.VehiclesRepository;
import com.gmech.vehicles.vehicles.VehiclesRequest;
import com.gmech.vehicles.vehicles.VehiclesResponse;
import com.gmech.vehicles.exception.DuplicateException;

@Service
@RequiredArgsConstructor
public class VehiclesService {

    private final VehiclesRepository vehiclesRepository;

    @Autowired
    private final ModelMapper modelMapper;

    public VehiclesResponse create(VehiclesRequest request) {
        vehiclesRepository.findByVin(request.getVin()).ifPresent(c -> {
            throw new DuplicateException("A megadott alvázszámmal már rendelkezik jármű!");
        });

        vehiclesRepository.findByLicenceplate(request.getLicenceplate()).ifPresent(c -> {
            throw new DuplicateException("A megadott rendszámmal már rendelkezik jármű!");
        });

        var vehicles = Vehicles.builder()
                .vin(request.getVin())
                .licenceplate(request.getLicenceplate())
                .customerId(request.getCustomerId())
                .productionYear(request.getProdoctionYear())
                .mileage(request.getMileage())
                .carBrand(request.getCarBrand())
                .carMake(request.getCarMake())
                .fuelType(request.getFuelType())
                .displacement(request.getDisplacement())
                .build();

        return this.modelMapper.map(
                vehiclesRepository.save(vehicles),
                VehiclesResponse.class);
    }
}