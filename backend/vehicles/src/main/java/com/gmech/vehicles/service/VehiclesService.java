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
import com.gmech.vehicles.vehicles.VehiclesRequestPut;
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

        vehiclesRepository.findByLicencePlate(request.getLicencePlate()).ifPresent(c -> {
            throw new DuplicateException("A megadott rendszámmal már rendelkezik jármű!");
        });

        var vehicles = Vehicles.builder()
                .vin(request.getVin())
                .licencePlate(request.getLicencePlate())
                .customerId(request.getCustomerId())
                .productionYear(request.getProductionYear())
                .mileage(request.getMileage())
                .carBrand(request.getCarBrand())
                .carMake(request.getCarMake())
                .displacement(request.getDisplacement())
                .fuelType(request.getFuelType())
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

    public List<VehiclesResponse> getAllForCustomerId(Integer customerId) {
        var vehicles = vehiclesRepository.findAllVehiclesByCustomerId(customerId);

        return vehicles.stream().map((vehicle) -> modelMapper.map(vehicle, VehiclesResponse.class))
                .collect(Collectors.toList());

    }

    public VehiclesResponse put(VehiclesRequestPut request) {

        var vehicle = vehiclesRepository.findById(request.getId())
                .orElseThrow(() -> new IncorrectIdException("A megadott aznosító nem létezik!"));
        vehicle.setVin(request.getVin());
        vehicle.setLicencePlate(request.getLicencePlate());
        vehicle.setCustomerId(request.getCustomerId());
        vehicle.setProductionYear(request.getProductionYear());
        vehicle.setMileage(request.getMileage());
        vehicle.setCarBrand(request.getCarBrand());
        vehicle.setCarMake(request.getCarMake());
        vehicle.setDisplacement(request.getDisplacement());
        vehicle.setFuelType(request.getFuelType());

        vehiclesRepository.save(vehicle);
        return this.modelMapper.map(
                request,
                VehiclesResponse.class);

    }

    public void delete(Integer id) {
        vehiclesRepository.findById(id)
                .orElseThrow(() -> new IncorrectIdException("A megadott aznosító nem létezik!"));
        vehiclesRepository.deleteById(id);
    }

}