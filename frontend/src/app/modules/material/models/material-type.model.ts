export enum MaterialTypeEnum {
  material = 'material',
  service = 'service',
}

export const MaterialTypeToLabelMapping: Record<MaterialTypeEnum, string> = {
  [MaterialTypeEnum.material]: 'Termék',
  [MaterialTypeEnum.service]: 'Szolgáltatás',
}