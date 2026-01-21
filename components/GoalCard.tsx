
import React from 'react';
import { Goal, StatusInfo } from '../types';
import { getStatus } from '../utils/helpers';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  year: string;
  quad: string;
  onClick: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, year, quad, onClick }) => {
  const yearData = goal.yearly_data[year];
  if (!yearData) return null;

  const displayResult = quad === 'anual' 
    ? yearData.resultado 
    : (yearData.quadrimestres[quad as keyof typeof yearData.quadrimestres] || yearData.resultado);

  const status = getStatus(goal, displayResult, yearData.esperado);

  const colorClasses: Record<string, string> = {
    emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    green: 'border-green-500 bg-green-50 text-green-700',
    rose: 'border-rose-500 bg-rose-50 text-rose-700',
    orange: 'border-orange-500 bg-orange-50 text-orange-700',
    amber: 'border-amber-500 bg-amber-50 text-amber-700',
    gray: 'border-gray-500 bg-gray-50 text-gray-700',
  };

  const badgeClasses: Record<string, string> = {
    emerald: 'bg-emerald-100 text-emerald-800',
    green: 'bg-green-100 text-green-800',
    rose: 'bg-rose-100 text-rose-800',
    orange: 'bg-orange-100 text-orange-800',
    amber: 'bg-amber-100 text-amber-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <div 
      onClick={() => onClick(goal)}
      className={`p-4 border-l-4 rounded-lg shadow-sm cursor-pointer transition-all hover:shadow-md ${colorClasses[status.color] || 'border-gray-200 bg-white'}`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold uppercase tracking-wider opacity-70">Meta {goal.id}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${badgeClasses[status.color]}`}>
          {status.text}
        </span>
      </div>
      <h3 className="text-sm font-semibold leading-tight mb-3 line-clamp-3 text-gray-900">{goal.title}</h3>
      
      <div className="flex items-center justify-between text-xs pt-3 border-t border-black/5 mt-auto">
        <div className="flex flex-col">
          <span className="opacity-60">Esperado</span>
          <span className="font-bold">{yearData.esperado}</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="opacity-60">Alcançado</span>
          <span className="font-bold">{displayResult || '---'}</span>
        </div>
      </div>

      <div className="mt-3 flex items-center text-[10px] opacity-60">
        {goal.polaridade === 'maior' ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
        <span>{goal.polaridade === 'maior' ? 'Polaridade Positiva' : 'Polaridade Negativa'}</span>
      </div>
    </div>
  );
};

export default GoalCard;
