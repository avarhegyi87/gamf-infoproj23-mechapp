package com.gmech.vehicles.vehicles;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiclesRepository extends JpaRepository<Vehicles, Integer> {

    Optional<Vehicles> findByVin(String vin);

    Optional<Vehicles> findByLicenceplate(String licenceplate);

    List<Vehicles> findAllByCustomerId(Integer id);
}
