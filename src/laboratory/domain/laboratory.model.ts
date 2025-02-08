export interface Laboratory {
  id: string;
  name: string;
  region: string;
  town: string;
}

export type LaboratoryDto = Omit<Laboratory, 'id'>;
