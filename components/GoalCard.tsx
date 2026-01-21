
import React, { useState } from 'react';
import { Goal } from '../types';
import { getStatus, calculateProgress } from '../utils/helpers';
import { TrendingUp, TrendingDown, ChevronDown, ChevronUp, FileText, Target, ArrowRight } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  year: string;
  quad: string;
  onClick: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, year, quad, onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const yearData = goal.yearly_data[year];
  if (!yearData) return null;

  const displayResult = quad === 'anual' 
    ? yearData.resultado 
    : (yearData.quadrimestres[quad as keyof typeof yearData.quadrimestres] || yearData.resultado);

  const status = getStatus(goal, displayResult, yearData.esperado);
  const progress = calculateProgress(displayResult, yearData.esperado, goal.polaridade);

  const colorMap: Record<string, { bg: string, border: string, text: string, bar: string, light: string }> = {
    emerald: { bg: 'bg-emerald-500', border: 'border-emerald-200', text: 'text-emerald-700', bar: 'bg-emerald-500', light: 'bg-emerald-50' },
    green: { bg: 'bg-green-500', border: 'border-green-200', text: 'text-green-700', bar: 'bg-green-500', light: 'bg-green-50' },
    rose: { bg: 'bg-rose-500', border: 'border-rose-200', text: 'text-rose-700', bar: 'bg-rose-500', light: 'bg-rose-50' },
    orange: { bg: 'bg-orange-500', border: 'border-orange-200', text: 'text-orange-700', bar: 'bg-orange-500', light: 'bg-orange-50' },
    amber: { bg: 'bg-amber-500', border: 'border-amber-200', text: 'text-amber-700', bar: 'bg-amber-500', light: 'bg-amber-50' },
    gray: { bg: 'bg-gray-500', border: 'border-gray-200', text: 'text-gray-700', bar: 'bg-gray-500', light: 'bg-gray-50' },
  };

  const currentTheme = colorMap[status.color] || colorMap.gray;

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Top Banner Accent */}
      <div className={`h-1.5 w-full ${currentTheme.bg}`} />
      
      <div className="p-6 flex-grow flex flex-col">
        {/* ID and Status Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-gray-50 text-gray-400 font-bold text-[10px] border border-gray-100">
              #{goal.id}
            </span>
            <div className={`px-2.5 py-1 rounded-full ${currentTheme.light} border ${currentTheme.border} flex items-center gap-1.5`}>
              <div className={`w-1.5 h-1.5 rounded-full ${currentTheme.bg} animate-pulse`} />
              <span className={`text-[10px] font-black uppercase tracking-tight ${currentTheme.text}`}>
                {status.text}
              </span>
            </div>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Target className="text-gray-300" size={16} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-gray-800 leading-snug mb-6 line-clamp-2 min-h-[40px] group-hover:text-blue-700 transition-colors">
          {goal.title}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Esperado</p>
            <p className="text-base font-black text-gray-700 tracking-tight">{yearData.esperado}</p>
          </div>
          <div className="p-3 bg-gray-50/50 rounded-2xl border border-gray-100/50">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Resultado</p>
            <p className={`text-base font-black tracking-tight ${currentTheme.text}`}>
              {displayResult || '---'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Progresso da Meta</span>
            <span className={`text-[10px] font-black ${currentTheme.text}`}>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${currentTheme.bar} transition-all duration-1000 ease-out rounded-full`} 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>

        {/* Analysis Section (Expandable) */}
        {goal.analysis && (
          <div className="mt-auto pt-4 border-t border-gray-50">
            <button 
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className={`w-full flex items-center justify-between text-[10px] font-black tracking-widest transition-colors ${isExpanded ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <span className="flex items-center gap-1.5">
                <FileText size={12} /> ANÁLISE TÉCNICA
              </span>
              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            
            {isExpanded && (
              <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50 relative">
                  <div className="absolute top-3 left-3 opacity-10">
                    <FileText size={40} className="text-blue-600" />
                  </div>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium italic relative z-10">
                    "{goal.analysis}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {goal.polaridade === 'maior' ? (
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-md">
              <TrendingUp size={12} />
              <span className="text-[9px] font-black uppercase">Ampliar</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-rose-600 bg-rose-100/50 px-2 py-0.5 rounded-md">
              <TrendingDown size={12} />
              <span className="text-[9px] font-black uppercase">Reduzir</span>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => onClick(goal)}
          className="text-[10px] font-black text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
        >
          MAIS DETALHES 
          <ArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default GoalCard;
