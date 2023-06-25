import { Quotation } from '../../quotation/models/quotation.model';
import { User } from '../../users/models/user.model';

export interface Worksheet {
  id: number,
  mechanicId: User | number,
  startDate: Date,
  endDate?: Date,
  garageId: number,
  createdBy: User | number,
  updatedBy?: User | number,
  quotationId: Quotation | number,
  comment: string,
  invoiced: boolean,
}
