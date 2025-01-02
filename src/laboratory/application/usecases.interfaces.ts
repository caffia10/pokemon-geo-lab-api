import { Laboratory, LaboratoryDto } from '../domain/laboratory.model';

export interface CreateLaboratoryUseCase {
  do(laboratory: LaboratoryDto): Promise<void>;
}

export interface GetByIdLaboratoryUseCase {
  do(id: string): Promise<Laboratory>;
}

export interface GetLaboratoryListUseCase {
  do(): Promise<Laboratory[]>;
}

export const CreateLaboratoryUseCase = Symbol('CreateLaboratoryUseCase');
export const GetByIdLaboratoryUseCase = Symbol('GetByIdLaboratoryUseCase');
export const GetLaboratoryListUseCase = Symbol('GetLaboratoryListUseCase');
