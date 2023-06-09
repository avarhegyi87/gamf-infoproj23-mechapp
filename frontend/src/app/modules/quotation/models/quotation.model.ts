import { Customer } from '../../customer/models/customer.model';
import { Vehicle } from '../../vehicle/models/vehicle.model';

export interface Quotation {

    id: number;
    vehicle: Vehicle | number;
    customer: Customer | number;
    materialList: string[];
    description: string;
    createDate: Date;
    finalizeDate: Date;

}
