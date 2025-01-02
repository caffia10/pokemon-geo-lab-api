export interface LaboratoryDto {
  name: string;
  region: string;
  town: string;
}

export interface Laboratory extends LaboratoryDto {
  id: string;
}
