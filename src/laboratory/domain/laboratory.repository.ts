import { Laboratory, LaboratoryDto } from './laboratory.model';

export interface LaboratoryRepository {
  create(laboratory: LaboratoryDto): Promise<void>;
  getById(id: string): Promise<Laboratory>;
}

export const LaboratoryRepository = Symbol('LaboratoryRepository');
