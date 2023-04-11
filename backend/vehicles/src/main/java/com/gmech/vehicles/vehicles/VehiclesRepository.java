package com.gmech.vehicles.vehicles;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiclesRepository extends JpaRepository<Vehicles, Integer> {

    Optional<Vehicles> findByVin(String vin);

    Optional<Vehicles> findByLicencePlate(String licencePlate);

    List<Vehicles> findAllVehiclesByCustomerId(Integer customerId);
}
