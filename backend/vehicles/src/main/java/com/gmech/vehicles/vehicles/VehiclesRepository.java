package com.gmech.vehicles.vehicles;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiclesRepository extends JpaRepository<Vehicles, Integer> {

    Optional<Vehicles> findByVin(String vin);

    Optional<Vehicles> findByLicenceplate(String licenceplate);

    Optional<Vehicles> findByOwner(Integer owner);
}
