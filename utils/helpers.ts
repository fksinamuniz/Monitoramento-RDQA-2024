
import { Goal, Polarity, StatusInfo } from '../types';

export function parseValue(value: string | number | undefined): number {
  if (value === undefined || value === null) return NaN;
  const strValue = String(value).toLowerCase().trim();
  
  if (strValue === 'na' || strValue === '' || strValue === 's/n' || 
      strValue.includes('andamento') || strValue.includes('apurando') || 
      strValue.includes('mensurado')) {
    return NaN;
  }

  // Remove % and fix comma for decimals
  const cleanedValue = strValue.replace('%', '').replace(',', '.').replace("'", "").trim();
  return parseFloat(cleanedValue);
}

export function getStatus(goal: Goal, result: string | number | undefined, expected: string | number | undefined): StatusInfo {
  const resStr = String(result || '').toLowerCase();
  if (!result || resStr.includes('andamento') || resStr.includes('apurando') || resStr === 's/n' || resStr === 'na' || resStr.includes('mensurado')) {
    return { text: "Em Andamento", color: "amber" };
  }

  const expNum = parseValue(expected);
  const resNum = parseValue(result);

  if (isNaN(expNum) || isNaN(resNum)) {
    return { text: "Não Aplicável", color: "gray" };
  }

  if (goal.polaridade === Polarity.MENOR) {
    if (resNum < expNum) return { text: "Superada", color: "emerald" };
    if (resNum === expNum) return { text: "Alcançada", color: "green" };
    return { text: "Não Alcançada", color: "rose" };
  } else {
    if (resNum > expNum) return { text: "Superada", color: "emerald" };
    if (resNum >= expNum) return { text: "Alcançada", color: "green" };
    if (resNum >= expNum * 0.9) return { text: "Parcialmente Alcançada", color: "orange" };
    return { text: "Não Alcançada", color: "rose" };
  }
}

export function getSimplifiedStatus(detailedStatus: string): 'Alcançada' | 'Não Alcançada' | 'Outro' {
  switch (detailedStatus) {
    case 'Superada':
    case 'Alcançada':
      return 'Alcançada';
    case 'Parcialmente Alcançada':
    case 'Não Alcançada':
      return 'Não Alcançada';
    default:
      return 'Outro';
  }
}
