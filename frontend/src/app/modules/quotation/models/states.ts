export enum QuotationStateEnum {
  Created = 0,
  Active = 1,
  Inactive = 2,
}

export const QuotationStateToLabelMapping: Record<QuotationStateEnum, string> = {
  [QuotationStateEnum.Created]: 'Létrehozott',
  [QuotationStateEnum.Active]: 'Elfogadott',
  [QuotationStateEnum.Inactive]: 'Elutasított',
};
