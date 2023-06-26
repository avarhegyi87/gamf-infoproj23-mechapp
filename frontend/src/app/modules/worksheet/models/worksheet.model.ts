import { Quotation } from '../../quotation/models/quotation.model';
import { User } from '../../users/models/user.model';

export interface Worksheet {
  id: number,
  mechanicId: User | number,
  startDate: string,
  endDate?: string,
  garageId: number,
  createdBy: User | number,
  updatedBy?: User | number,
  quotationId: Quotation | number,
  comment: string,
  invoiced: number,
}
