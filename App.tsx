
import React, { useState, useMemo } from 'react';
import { Goal, YearlyGoalData } from './types';
import { DATA_2024_RAW, CALCULATION_METHODS } from './constants';
import GoalCard from './components/GoalCard';
import GoalModal from './components/GoalModal';
import { Search, Filter, Database, FileBarChart, RefreshCw, Layers, Target, FileText, LayoutGrid, ChevronRight } from 'lucide-react';
import { getStatus, getSimplifiedStatus } from './utils/helpers';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuad, setSelectedQuad] = useState('anual');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedDiretriz, setSelectedDiretriz] = useState('todas');
  const [selectedObjetivo, setSelectedObjetivo] = useState('todos');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  // Initialize consolidated data
  const goals: Goal[] = useMemo(() => {
    return DATA_2024_RAW.map(item => {
      const yearly_data: { [year: string]: YearlyGoalData } = {
        '2024': {
          esperado: item.esperado,
          resultado: item.rag,
          quadrimestres: { "1": item[1], "2": item[2], "3": item[3] }
        },
        '2023': { esperado: item.esperado, resultado: "---", quadrimestres: {} },
        '2022': { esperado: item.esperado, resultado: "---", quadrimestres: {} },
      };

      return {
        id: item.id,
        title: item.title,
        polaridade: item.pol,
        diretriz: item.diretriz || "Geral",
        objetivo: item.objetivo || "Geral",
        analysis: (item as any).analysis,
        calculationMethod: CALCULATION_METHODS[item.id] || "Indicador calculado conforme padrões técnicos do RDQA/RAG.",
        yearly_data
      };
    });
  }, []);

  // Filter dependent objectives
  const availableObjectives = useMemo(() => {
    if (selectedDiretriz === 'todas') {
      return Array.from(new Set(goals.map(g => g.objetivo))).sort();
    }
    return Array.from(new Set(goals.filter(g => g.diretriz === selectedDiretriz).map(g => g.objetivo))).sort();
  }, [selectedDiretriz, goals]);

  const filteredGoals = useMemo(() => {
    return goals.filter(goal => {
      const matchesSearch = goal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           String(goal.id).includes(searchTerm);
      
      const yearData = goal.yearly_data[selectedYear];
      if (!yearData) return false;

      const displayResult = selectedQuad === 'anual' 
        ? yearData.resultado 
        : (yearData.quadrimestres[selectedQuad as keyof typeof yearData.quadrimestres] || yearData.resultado);
      
      const status = getStatus(goal, displayResult, yearData.esperado);
      const simplified = getSimplifiedStatus(status.text);
      
      const matchesStatus = selectedStatus === 'todos' || simplified === selectedStatus;
      const matchesDiretriz = selectedDiretriz === 'todas' || goal.diretriz === selectedDiretriz;
      const matchesObjetivo = selectedObjetivo === 'todos' || goal.objetivo === selectedObjetivo;

      return matchesSearch && matchesStatus && matchesDiretriz && matchesObjetivo;
    });
  }, [goals, searchTerm, selectedYear, selectedQuad, selectedStatus, selectedDiretriz, selectedObjetivo]);

  const chartData = useMemo(() => {
    const counts = { 'Alcançada': 0, 'Não Alcançada': 0, 'Outro': 0 };
    filteredGoals.forEach(goal => {
      const yearData = goal.yearly_data[selectedYear];
      const displayResult = selectedQuad === 'anual' ? yearData.resultado : yearData.quadrimestres[selectedQuad as keyof typeof yearData.quadrimestres];
      const status = getStatus(goal, displayResult, yearData.esperado);
      counts[getSimplifiedStatus(status.text)]++;
    });

    return counts;
  }, [filteredGoals, selectedYear, selectedQuad]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('todos');
    setSelectedQuad('anual');
    setSelectedDiretriz('todas');
    setSelectedObjetivo('todos');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Original Header */}
      <header className="bg-white py-4 px-6 shadow-sm border-b border-gray-100">
        <div className="container mx-auto flex items-center gap-4">
          <div className="bg-[#1D4ED8] p-3 rounded-2xl shadow-lg shadow-blue-100">
            <Database className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#0F172A] tracking-tight leading-none uppercase">RAG PARAUAPEBAS</h1>
            <p className="text-[11px] text-[#2563EB] font-bold mt-1 uppercase tracking-wider">Painel Histórico PMS 2022-2025</p>
          </div>
        </div>
      </header>

      {/* Primary Filters Row */}
      <div className="container mx-auto px-6 mt-8">
        <div className="flex flex-col lg:flex-row items-center gap-4">
          <div className="flex-grow w-full relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por indicador ou número da meta..."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <select className="pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 appearance-none outline-none cursor-pointer hover:border-blue-300 transition-colors uppercase shadow-sm"
                value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="2024">ANO BASE: 2024</option>
                <option value="2023">ANO BASE: 2023</option>
                <option value="2022">ANO BASE: 2022</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <div className="relative flex-grow sm:flex-grow-0">
              <select className="pl-4 pr-10 py-3.5 bg-white border border-gray-200 rounded-2xl text-xs font-bold text-gray-700 appearance-none outline-none cursor-pointer hover:border-blue-300 transition-colors uppercase shadow-sm"
                value={selectedQuad} onChange={(e) => setSelectedQuad(e.target.value)}>
                <option value="anual">RESUMO ANUAL (RAG)</option>
                <option value="1">1º QUADRIMESTRE (RDQA)</option>
                <option value="2">2º QUADRIMESTRE (RDQA)</option>
                <option value="3">3º QUADRIMESTRE (RDQA)</option>
              </select>
              <FileBarChart className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
            </div>

            <button onClick={handleResetFilters} className="px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs rounded-2xl flex items-center gap-2 transition-all">
              <RefreshCw size={14} /> RESET
            </button>
          </div>
        </div>

        {/* Dependent Select Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="relative group">
            <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 group-focus-within:scale-110 transition-transform" size={16} />
            <select className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black text-gray-700 appearance-none outline-none uppercase tracking-tight shadow-sm hover:border-blue-200 transition-colors"
              value={selectedDiretriz} onChange={(e) => { setSelectedDiretriz(e.target.value); setSelectedObjetivo('todos'); }}>
              <option value="todas">FILTRAR POR DIRETRIZ (TODAS)</option>
              {Array.from(new Set(goals.map(g => g.diretriz))).sort().map((d, i) => <option key={i} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="relative group">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 group-focus-within:scale-110 transition-transform" size={16} />
            <select className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black text-gray-700 appearance-none outline-none uppercase tracking-tight shadow-sm hover:border-purple-200 transition-colors disabled:opacity-50"
              value={selectedObjetivo} onChange={(e) => setSelectedObjetivo(e.target.value)}>
              <option value="todos">FILTRAR POR OBJETIVO (TODOS)</option>
              {availableObjectives.map((o, i) => <option key={i} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="relative group">
            <LayoutGrid className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 group-focus-within:scale-110 transition-transform" size={16} />
            <select className="w-full pl-12 pr-6 py-4 bg-white border border-gray-200 rounded-2xl text-[11px] font-black text-gray-700 appearance-none outline-none uppercase tracking-tight shadow-sm hover:border-emerald-200 transition-colors"
              value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
              <option value="todos">FILTRAR POR STATUS (TODOS)</option>
              <option value="Alcançada">ALCANÇADA / SUPERADA</option>
              <option value="Não Alcançada">NÃO ALCANÇADA</option>
              <option value="Outro">EM ANDAMENTO / APURANDO</option>
            </select>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-6 py-8 flex-grow">
        {/* Summary Card with Counter Animation */}
        <div className="mb-10 bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8 border-b border-gray-50 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-xl">
                <FileText className="text-blue-600" size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0F172A] tracking-tighter uppercase leading-none">Visão Geral de Performance</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ciclo PMS {selectedYear} / Período: {selectedQuad === 'anual' ? 'Anual' : selectedQuad + 'º Quad'}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
              <span className="text-[10px] font-black text-gray-400 uppercase">Progresso Global:</span>
              <span className="text-sm font-black text-blue-600">{( (chartData.Alcançada / (filteredGoals.length || 1)) * 100 ).toFixed(1)}%</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group bg-[#F8FAFC] p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:bg-emerald-50 border border-transparent hover:border-emerald-100">
              <span className="text-6xl font-black text-[#10B981] mb-2 tracking-tighter">{chartData.Alcançada}</span>
              <span className="text-[11px] font-black text-gray-400 group-hover:text-emerald-600 uppercase tracking-widest transition-colors">ALCANÇADA / SUPERADA</span>
            </div>
            <div className="group bg-[#F8FAFC] p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:bg-rose-50 border border-transparent hover:border-rose-100">
              <span className="text-6xl font-black text-[#F43F5E] mb-2 tracking-tighter">{chartData['Não Alcançada']}</span>
              <span className="text-[11px] font-black text-gray-400 group-hover:text-rose-600 uppercase tracking-widest transition-colors">NÃO ALCANÇADA</span>
            </div>
            <div className="group bg-[#F8FAFC] p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:bg-amber-50 border border-transparent hover:border-amber-100">
              <span className="text-6xl font-black text-[#F59E0B] mb-2 tracking-tighter">{chartData.Outro}</span>
              <span className="text-[11px] font-black text-gray-400 group-hover:text-amber-600 uppercase tracking-widest transition-colors">EM ANDAMENTO</span>
            </div>
          </div>
        </div>

        {/* Goals Grid Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
           <div className="flex items-center gap-4">
             <h3 className="text-2xl font-black text-[#0F172A] tracking-tighter uppercase">Painel de Metas</h3>
             <ChevronRight className="text-gray-300 hidden sm:block" />
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-400 uppercase">Mostrando</span>
                <span className="bg-blue-600 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tight">{filteredGoals.length} Indicadores</span>
             </div>
           </div>
        </div>

        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} year={selectedYear} quad={selectedQuad} onClick={setSelectedGoal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
            <Database className="text-gray-100 mb-6" size={80} />
            <p className="text-xl font-black text-gray-400 uppercase tracking-widest">Nenhum indicador atende aos filtros</p>
            <p className="text-xs text-gray-400 mt-2">Tente ajustar os parâmetros de Diretriz ou Objetivo.</p>
            <button onClick={handleResetFilters} className="mt-8 px-8 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-xs hover:bg-blue-100 transition-all tracking-tight uppercase">
              REDEFINIR TODOS OS FILTROS
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="space-y-2">
             <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="bg-gray-100 p-2 rounded-lg"><Database size={18} className="text-gray-400" /></div>
                <h4 className="font-black text-gray-900 tracking-tight text-sm uppercase">DATA OPS / SEMSA</h4>
             </div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">© 2025 PMS PARAUAPEBAS / MONITORAMENTO ESTRATÉGICO</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
             <div className="text-center">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">DATA REPOSITORY</p>
                <span className="text-[10px] font-black text-blue-600 uppercase">PMS-2022-2025.JSON</span>
             </div>
             <div className="text-center border-l border-gray-100 pl-8">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">BUILD VERSION</p>
                <span className="text-[10px] font-black text-gray-600 uppercase">V.0.3.5-LATEST</span>
             </div>
             <div className="text-center border-l border-gray-100 pl-8">
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">SERVER STATUS</p>
                <div className="flex items-center gap-2 justify-center">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[10px] font-black text-gray-600 uppercase">OPERATIONAL</span>
                </div>
             </div>
          </div>
        </div>
      </footer>

      {selectedGoal && <GoalModal goal={selectedGoal} year={selectedYear} quad={selectedQuad} onClose={() => setSelectedGoal(null)} />}
    </div>
  );
};

export default App;
