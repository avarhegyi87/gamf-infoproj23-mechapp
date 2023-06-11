export enum MaterialTypeEnum {
  material = 'material',
  service = 'service',
}

export const MaterialTypeToLabelMapping: Record<MaterialTypeEnum, string> = {
  [MaterialTypeEnum.material]: 'Termék',
  [MaterialTypeEnum.service]: 'Szolgáltatás',
}

export function findEnumByLabel(label: string): MaterialTypeEnum | undefined {
  for (const key of Object.keys(MaterialTypeToLabelMapping)) {
    if (MaterialTypeToLabelMapping[key as MaterialTypeEnum] === label)
      return key as MaterialTypeEnum;
  }
  return undefined;
}
