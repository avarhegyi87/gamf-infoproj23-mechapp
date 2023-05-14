import { Customer } from '../../customer/models/customer.model';

export interface Vehicle {
  id: number;
  vin: string;
  licencePlate: string;
  customer: Customer;
  productionYear: number;
  mileage: number;
  carBrand: string;
  carMake: string;
  displacement: number;
  fuelType: string;
}
