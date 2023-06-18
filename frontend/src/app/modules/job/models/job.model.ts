import { Material } from "../../material/models/material.model";
import { Quotation } from "../../quotation/models/quotation.model";

export interface Job {

    id: number;
    quotationId: Quotation | number;
    //worksheetId: Worksheet | number;
    materialId: Material | number;
    unit: number;
}
