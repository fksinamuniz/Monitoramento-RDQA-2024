
import React, { useState, useMemo } from 'react';
import { Goal, YearlyGoalData } from './types';
import { DATA_2024_RAW, CALCULATION_METHODS } from './constants';
import GoalCard from './components/GoalCard';
import GoalModal from './components/GoalModal';
import { Search, Filter, Database, FileBarChart, Download, Settings, RefreshCw, Layers, Target, Info, LayoutGrid } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
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
        '2025': { esperado: item.esperado, resultado: "S/N", quadrimestres: {} }
      };

      return {
        id: item.id,
        title: item.title,
        polaridade: item.pol,
        diretriz: item.diretriz || "Geral",
        objetivo: item.objetivo || "Geral",
        calculationMethod: CALCULATION_METHODS[item.id] || "Conforme pactuação ministerial e municipal.",
        yearly_data
      };
    });
  }, []);

  // Unique lists for dropdowns
  const diretrizes = useMemo(() => {
    const set = new Set(goals.map(g => g.diretriz));
    return Array.from(set).sort();
  }, [goals]);

  const objetivos = useMemo(() => {
    const filtered = selectedDiretriz === 'todas' 
      ? goals 
      : goals.filter(g => g.diretriz === selectedDiretriz);
    const set = new Set(filtered.map(g => g.objetivo));
    return Array.from(set).sort();
  }, [goals, selectedDiretriz]);

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

    return [
      { name: 'Alcançada', value: counts['Alcançada'], color: '#10b981' },
      { name: 'Não Alcançada', value: counts['Não Alcançada'], color: '#f43f5e' },
      { name: 'Em Andamento', value: counts['Outro'], color: '#f59e0b' }
    ];
  }, [filteredGoals, selectedYear, selectedQuad]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedStatus('todos');
    setSelectedQuad('anual');
    setSelectedDiretriz('todas');
    setSelectedObjetivo('todos');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2.5 rounded-xl text-white shadow-blue-200 shadow-lg">
              <Database size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 tracking-tighter">RAG PARAUAPEBAS</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Painel Histórico PMS 2022-2025</p>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
             <div className="text-right border-r pr-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Indicadores Totais</p>
                <p className="text-sm font-black text-gray-900">97 Metas</p>
             </div>
             <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black py-2.5 px-5 rounded-xl transition-all shadow-emerald-100 shadow-md">
                <Download size={14} /> EXPORTAR RAG
             </button>
          </div>
        </div>
      </header>

      {/* Toolbar / Filters */}
      <div className="bg-white border-b py-6 sticky top-16 z-30">
        <div className="container mx-auto px-4 space-y-5">
          {/* Top Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5 lg:col-span-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Meta ou ID (ex: 78)..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="md:col-span-3 lg:col-span-2 relative">
              <select className="w-full pl-3 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                <option value="2024">ANO BASE: 2024</option>
                <option value="2023">ANO BASE: 2023</option>
                <option value="2022">ANO BASE: 2022</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>

            <div className="md:col-span-2 relative">
              <select className="w-full pl-3 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedQuad} onChange={(e) => setSelectedQuad(e.target.value)}>
                <option value="anual">PERÍODO: ANUAL</option>
                <option value="1">1º QUADRIMESTRE</option>
                <option value="2">2º QUADRIMESTRE</option>
                <option value="3">3º QUADRIMESTRE</option>
              </select>
              <FileBarChart className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            </div>

            <button onClick={handleResetFilters} className="md:col-span-2 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs py-3 rounded-xl transition-all">
              <RefreshCw size={14} /> RESET
            </button>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600" size={16} />
              <select className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 appearance-none shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedDiretriz} onChange={(e) => { setSelectedDiretriz(e.target.value); setSelectedObjetivo('todos'); }}>
                <option value="todas">TODAS AS DIRETRIZES</option>
                {diretrizes.map((d, i) => <option key={i} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-600" size={16} />
              <select className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 appearance-none shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedObjetivo} onChange={(e) => setSelectedObjetivo(e.target.value)}>
                <option value="todos">TODOS OS OBJETIVOS</option>
                {objetivos.map((o, i) => <option key={i} value={o}>{o}</option>)}
              </select>
            </div>

            <div className="relative">
              <LayoutGrid className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" size={16} />
              <select className="w-full pl-10 pr-8 py-3 bg-white border border-gray-200 rounded-xl text-[11px] font-bold text-gray-700 appearance-none shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                <option value="todos">TODOS OS STATUS</option>
                <option value="Alcançada">ALCANÇADA / SUPERADA</option>
                <option value="Não Alcançada">NÃO ALCANÇADA</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 flex-grow">
        {/* Statistics Hero */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl border shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-10 -mt-10 opacity-50"></div>
            <h2 className="text-lg font-black text-gray-900 mb-8 flex items-center gap-3">
              <FileBarChart className="text-blue-700" size={24} /> 
              RESUMO DE PERFORMANCE <span className="text-blue-200">/</span> {selectedYear}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
              {chartData.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border bg-gray-50 flex flex-col items-center justify-center text-center hover:bg-white transition-all hover:shadow-lg group">
                  <span className="text-4xl font-black mb-2 transition-transform group-hover:scale-110" style={{ color: item.color }}>{item.value}</span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-[2px]">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-3xl border shadow-sm flex flex-col items-center justify-center">
            <div className="h-[140px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={chartData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} paddingAngle={8} dataKey="value" stroke="none">
                    {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs font-black text-gray-900">DISTRIBUIÇÃO ATUAL</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">Dados Sincronizados</p>
            </div>
          </div>
        </div>

        {/* Goals Grid */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">METAS E INDICADORES</h2>
            <p className="text-xs text-gray-500 font-bold mt-1">Exibindo {filteredGoals.length} de {goals.length} metas cadastradas</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">A</div>
                <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">N</div>
                <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">E</div>
             </div>
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Legenda RAG Ativa</span>
          </div>
        </div>

        {filteredGoals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGoals.map(goal => (
              <GoalCard key={goal.id} goal={goal} year={selectedYear} quad={selectedQuad} onClick={setSelectedGoal} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="bg-gray-50 p-6 rounded-full mb-6">
              <RefreshCw className="text-gray-300" size={48} />
            </div>
            <p className="text-xl font-black text-gray-900">NENHUM DADO ENCONTRADO</p>
            <p className="text-sm text-gray-500 font-medium mt-2">Tente ajustar os filtros ou pesquisar por outro termo.</p>
            <button onClick={handleResetFilters} className="mt-8 bg-blue-700 text-white px-8 py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-100 hover:scale-105 transition-all">
              LIMPAR TUDO
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-700 p-2 rounded-lg text-white"><Database size={18} /></div>
                 <span className="font-black text-xl tracking-tighter text-gray-900 uppercase">RAG Parauapebas</span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed max-w-md">Plataforma desenvolvida para análise técnica e monitoramento dos resultados históricos do Plano Municipal de Saúde. Os dados são extraídos de fontes oficiais como SISAB, SINASC e sistemas próprios da SEMSA.</p>
            </div>
            <div>
               <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Referências</h4>
               <ul className="space-y-2">
                 <li><a href="#" className="text-xs text-blue-600 font-bold hover:underline">PMS 2022-2025</a></li>
                 <li><a href="#" className="text-xs text-blue-600 font-bold hover:underline">Relatórios RDQA</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-widest mb-4">Suporte Técnico</h4>
               <div className="bg-gray-50 p-4 rounded-xl border">
                 <p className="text-[10px] font-bold text-gray-400">Versão</p>
                 <p className="text-xs font-black text-gray-900">V.0.1.25-Build</p>
               </div>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">© 2025 SEMSA PARAUAPEBAS - GESTÃO DE SAÚDE</p>
            <div className="flex items-center gap-4">
               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
               <span className="text-[10px] font-black text-gray-600 uppercase">Base de Dados Integrada</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Goal Detail Modal */}
      {selectedGoal && <GoalModal goal={selectedGoal} year={selectedYear} quad={selectedQuad} onClose={() => setSelectedGoal(null)} />}
    </div>
  );
};

export default App;
