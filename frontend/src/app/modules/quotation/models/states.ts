export enum FuelTypeEnum {
    Created,
    Active,
    Inactive,

  }
  
  export const FuelTypeToLabelMapping: Record<FuelTypeEnum, string> = {
    [FuelTypeEnum.Created]: 'Létrehozott',
    [FuelTypeEnum.Active]: 'Elfogadott',
    [FuelTypeEnum.Inactive]: 'Elutasított',
  }