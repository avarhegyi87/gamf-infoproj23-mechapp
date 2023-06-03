import { Customer } from '../../customer/models/customer.model';
import { Vehicle } from '../../vehicle/models/vehicle.model';

export interface Quotation {

    id: number;
    vehicle: Vehicle;
    customer: Customer;
    jobList: string[];
    partList: string[];
    description: string;
    createDate: Date;
    finalizeDate: Date;

}
