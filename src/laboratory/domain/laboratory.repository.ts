import { Laboratory } from './laboratory.model';

export interface LaboratoryRepository {
  create(laboratory: Laboratory): Promise<void>;
  getById(id: string): Promise<Laboratory>;
}
