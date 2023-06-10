import { Customer } from '../../customer/models/customer.model';

export interface Vehicle {
  id: number;
  vin: string;
  licencePlate: string;
  customerId: Customer | number;
  productionYear: number;
  mileage: number;
  carBrand: string;
  carMake: string;
  displacement: number;
  fuelType: string;
}
