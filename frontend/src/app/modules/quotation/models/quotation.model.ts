import { Customer } from '../../customer/models/customer.model';
import { User } from '../../users/models/user.model';
import { Vehicle } from '../../vehicle/models/vehicle.model';

export interface Quotation {
  id: number;
  vehicleId: Vehicle | number;
  customerId: Customer | number;
  createdBy: User | number;
  updatedBy?: User | number;
  description: string;
  state: number;
  finalizeDate?: Date;
}
