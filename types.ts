
export enum Polarity {
  MAIOR = 'maior',
  MENOR = 'menor'
}

export interface QuadrimestreData {
  "1"?: string | number;
  "2"?: string | number;
  "3"?: string | number;
}

export interface YearlyGoalData {
  esperado: string | number;
  resultado: string | number;
  quadrimestres: QuadrimestreData;
}

export interface Goal {
  id: number;
  title: string;
  polaridade: Polarity;
  diretriz: string;
  objetivo: string;
  calculationMethod: string;
  yearly_data: { [year: string]: YearlyGoalData };
}

export type StatusType = 'Superada' | 'Alcançada' | 'Parcialmente Alcançada' | 'Não Alcançada' | 'Em Andamento' | 'Não Aplicável';

export interface StatusInfo {
  text: StatusType;
  color: string;
}
