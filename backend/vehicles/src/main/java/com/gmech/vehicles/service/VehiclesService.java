package com.gmech.vehicles.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import com.gmech.vehicles.vehicles.Vehicles;
import com.gmech.vehicles.vehicles.VehiclesRepository;
import com.gmech.vehicles.vehicles.VehiclesRequest;
import com.gmech.vehicles.vehicles.VehiclesResponse;
import com.gmech.vehicles.exception.DuplicateException;
import com.gmech.vehicles.exception.IncorrectIdException;

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
                .owner(request.getOwner())
                .production_year(request.getProduction_year())
                .mileage(request.getMileage())
                .car_brand(request.getCar_brand())
                .car_make(request.getCar_make())
                .displacement(request.getDisplacement())
                .fuel_type(request.getFuel_type())
                .build();

        return this.modelMapper.map(
                vehiclesRepository.save(vehicles),
                VehiclesResponse.class);
    }

    public VehiclesResponse get(Integer id) {
        var vehicles = vehiclesRepository.findById(id)
                .orElseThrow(() -> new IncorrectIdException("A megadott aznosító nem létezik!"));
        return this.modelMapper.map(
                vehicles,
                VehiclesResponse.class);
    }

    public List<VehiclesResponse> getAll() {
        var vehicles = vehiclesRepository.findAll();

        return vehicles.stream().map((vehicle) -> modelMapper.map(vehicle, VehiclesResponse.class))
                .collect(Collectors.toList());

    }

}