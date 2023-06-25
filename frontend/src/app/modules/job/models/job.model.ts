import { Material } from '../../material/models/material.model';
import { Quotation } from '../../quotation/models/quotation.model';
import { Worksheet } from '../../worksheet/models/worksheet.model';

export interface Job {
  id: number;
  quotationId?: Quotation | number;
  worksheetId?: Worksheet | number;
  materialId: Material | string;
  unit: number;
}
