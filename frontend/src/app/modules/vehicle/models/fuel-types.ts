export enum FuelTypeEnum {
  benzin = 'benzin',
  dizel = 'dizel',
  gaz = 'gaz',
  gazbenzin = 'gazbenzin',
  gazdizel = 'gazdizel',
  hibrid = 'hibrid',
  elektromos = 'elektromos',
  etanol = 'etanol',
  biodizel = 'biodizel',
}

export const FuelTypeToLabelMapping: Record<FuelTypeEnum, string> = {
  [FuelTypeEnum.benzin]: 'Benzin',
  [FuelTypeEnum.dizel]: 'Dízel',
  [FuelTypeEnum.gaz]: 'Gáz',
  [FuelTypeEnum.gazbenzin]: 'Gáz/Benzin',
  [FuelTypeEnum.gazdizel]: 'Gáz/Dízel',
  [FuelTypeEnum.hibrid]: 'Hibrid',
  [FuelTypeEnum.elektromos]: 'Elektromos',
  [FuelTypeEnum.etanol]: 'Etanol',
  [FuelTypeEnum.biodizel]: 'Biodízel',
}
