
import React, { useState } from 'react';
import { Goal, StatusInfo } from '../types';
import { getStatus, parseValue } from '../utils/helpers';
import { generateAnalysis } from '../services/geminiService';
// Added Info to the imports from lucide-react to fix the missing component error
import { X, FileText, Sparkles, Download, CheckCircle, AlertTriangle, Info } from 'lucide-react';

interface GoalModalProps {
  goal: Goal;
  year: string;
  quad: string;
  onClose: () => void;
}

const GoalModal: React.FC<GoalModalProps> = ({ goal, year, quad, onClose }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const yearData = goal.yearly_data[year];
  const displayResult = quad === 'anual' 
    ? yearData.resultado 
    : (yearData.quadrimestres[quad as keyof typeof yearData.quadrimestres] || yearData.resultado);
  const status = getStatus(goal, displayResult, yearData.esperado);

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    setError(null);
    const periodText = quad === 'anual' ? 'Anual' : `${quad}º RDQA`;
    
    const prompt = `
      Atue como um gestor de saúde pública experiente. Analise o seguinte indicador do RAG Parauapebas:
      Meta: ${goal.title}
      Ano: ${year} (${periodText})
      Esperado: ${yearData.esperado}
      Alcançado: ${displayResult}
      Status: ${status.text}
      
      Por favor, forneça:
      1. Breve diagnóstico técnico da situação.
      2. 3 hipóteses do porquê esse resultado foi atingido (ou não).
      3. Sugestões práticas de melhoria.
      Use Markdown e seja conciso.
    `;

    try {
      const result = await generateAnalysis(prompt);
      setAnalysis(result || "Não foi possível gerar a análise.");
    } catch (err) {
      setError("Erro ao conectar com a IA. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-start bg-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Meta {goal.id}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-current bg-white 
                ${status.color === 'emerald' || status.color === 'green' ? 'text-green-700' : 'text-rose-700'}`}>
                {status.text}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{goal.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-grow space-y-8">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <p className="text-xs font-semibold text-blue-600 uppercase mb-1">Esperado</p>
              <p className="text-3xl font-bold text-blue-900">{yearData.esperado}</p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-600 uppercase mb-1">Alcançado</p>
              <p className="text-3xl font-bold text-emerald-900">{displayResult || 'N/A'}</p>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
              <p className="text-xs font-semibold text-gray-600 uppercase mb-1">Contexto</p>
              <p className="text-sm font-medium text-gray-800">RAG {year} - {quad === 'anual' ? 'Anual' : `${quad}º RDQA`}</p>
            </div>
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h4 className="flex items-center text-sm font-bold text-gray-700 uppercase mb-3 gap-2">
                <FileText size={16} /> Diretriz & Objetivo
              </h4>
              <div className="space-y-3">
                <div className="text-xs p-3 bg-gray-50 rounded border">
                  <span className="block font-bold mb-1 opacity-60">Diretriz:</span>
                  {goal.diretriz}
                </div>
                <div className="text-xs p-3 bg-gray-50 rounded border">
                  <span className="block font-bold mb-1 opacity-60">Objetivo:</span>
                  {goal.objetivo}
                </div>
              </div>
            </section>
            <section>
              <h4 className="flex items-center text-sm font-bold text-gray-700 uppercase mb-3 gap-2">
                <Info size={16} /> Metodologia de Cálculo
              </h4>
              <div className="text-xs p-3 bg-gray-50 rounded border leading-relaxed text-gray-600 italic">
                {goal.calculationMethod || "Método não especificado nos documentos base."}
              </div>
            </section>
          </div>

          {/* AI Analysis Section */}
          <section className="border-t pt-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className="flex items-center text-lg font-bold text-gray-900 gap-2">
                <Sparkles size={20} className="text-blue-600" /> Análise Qualitativa com IA
              </h4>
              {!analysis && !loading && (
                <button 
                  onClick={handleGenerateAnalysis}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition-all shadow-sm"
                >
                  Gerar Análise agora
                </button>
              )}
            </div>

            {loading && (
              <div className="flex flex-col items-center justify-center py-12 animate-pulse">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium text-gray-500">Consultando especialista em gestão de saúde...</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-3">
                <AlertTriangle size={20} /> {error}
              </div>
            )}

            {analysis && (
              <div className="prose prose-sm max-w-none bg-blue-50/30 p-6 rounded-xl border border-blue-100">
                <div className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                  {analysis}
                </div>
                <div className="mt-6 pt-6 border-t border-blue-100 flex gap-4">
                   <button className="flex items-center gap-2 text-xs font-bold text-blue-600 hover:underline">
                     <Download size={14} /> Exportar como PDF
                   </button>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition-colors"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
