
import { Polarity } from './types';

export const CALCULATION_METHODS: { [key: number]: string } = {
  1: "Cobertura ACS: (ACS cadastrados / População Estimada) * 100",
  11: "Cálculo baseado no registro de doses aplicadas no SIPNI.",
  13: "Proporção de gestantes com 6+ consultas começando até 20ª semana.",
  23: "Número de óbitos infantis por mil nascidos vivos.",
  31: "Taxa de mortalidade prematura por DCNT (30-69 anos).",
  50: "Média de consultas médicas na APS por habitante masculino.",
  66: "Cobertura vacinal em menores de 1 ano para vacinas selecionadas.",
  78: "Nível de implementação do sistema de apuração de custos."
};

// Definições de Diretrizes
const D1 = "D1 - Fortalecimento da APS e Redes de Atenção";
const D2 = "D2 - Média e Alta Complexidade";
const D3 = "D3 - Vigilância em Saúde";
const D4 = "D4 - Gestão do SUS e Valorização do Servidor";
const D5 = "D5 - Investimentos em Saúde";

// Definições de Objetivos
const O11 = "1.1 - Aprimorar ações estratégicas e redes de atenção (Promoção/Prevenção)";
const O12 = "1.2 - Implementar Política de Assistência Farmacêutica";
const O13 = "1.3 - Integração sistêmica e humanização nas redes de atenção";
const O21 = "2.1 - Ampliar e qualificar o acesso à MAC e Hospitalar";
const O31 = "3.1 - Fortalecer Vigilância para controle de doenças e agravos";
const O41 = "4.1 - Implementar ações de valorização e planejamento";
const O51 = "5.1 - Construir, ampliar e equipar unidades de saúde";

export const DATA_2024_RAW = [
  // DIRETRIZ 1 - OBJETIVO 1.1
  { id: 1, title: "Aumentar Cobertura de ACS (Meta: 80%)", esperado: "80", 1: "73.85", 2: "75.14", 3: "72.73", rag: "72.73", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 2, title: "Ações assistenciais básicas para indígenas (3x/ano)", esperado: "3", 1: "0", 2: "2", 3: "3", rag: "3", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 3, title: "Assistência oftalmológica no PSE (Meta: 100%)", esperado: "100", 1: "0", 2: "25", 3: "40", rag: "40", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 4, title: "Acompanhamento Bolsa Família (Meta: 80%)", esperado: "80", 1: "65", 2: "72", 3: "78", rag: "78", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 5, title: "Cobertura populacional eSF (Meta: 80%)", esperado: "80", 1: "89.65", 2: "74.48", 3: "82.37", rag: "82.37", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 6, title: "Cobertura Equipes Atenção Básica (Meta: 92%)", esperado: "92", 1: "97.47", 2: "97.66", 3: "97.47", rag: "97.47", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 7, title: "Assistência por equipe multiprofissional na APS", esperado: "64", 1: "59", 2: "60", 3: "62", rag: "62", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 8, title: "Oferta de exames laboratoriais na UBS (Meta: 50%)", esperado: "50", 1: "30", 2: "35", 3: "45", rag: "45", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 9, title: "Reduzir crianças no programa APLV (Meta: -10%)", esperado: "10", 1: "12", 2: "11", 3: "10", rag: "10", pol: Polarity.MENOR, diretriz: D1, objetivo: O11 },
  { id: 10, title: "Reduzir gravidez na adolescência (Meta: 14,5%)", esperado: "14.5", 1: "15.3", 2: "15.1", 3: "14.8", rag: "14.8", pol: Polarity.MENOR, diretriz: D1, objetivo: O11 },
  { id: 11, title: "Vacina Poliomielite e Pentavalente (Meta: 95%)", esperado: "95", 1: "78", 2: "82", 3: "88", rag: "88", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 12, title: "Diabéticos com solicitação Hemoglobina Glicada", esperado: "90", 1: "35", 2: "58", 3: "72", rag: "72", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 13, title: "Gestantes com 6+ consultas pré-natal (Meta: 80%)", esperado: "80", 1: "62", 2: "68", 3: "74", rag: "74", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 14, title: "Gestantes com exames Sífilis/HIV (Meta: 95%)", esperado: "95", 1: "88", 2: "92", 3: "94", rag: "94", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 15, title: "Hipertensos com pressão aferida semestralmente", esperado: "90", 1: "45", 2: "62", 3: "81", rag: "81", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 16, title: "Gestantes com atendimento odontológico (Meta: 90%)", esperado: "90", 1: "54", 2: "68", 3: "79", rag: "79", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 17, title: "Acesso odontológico na Atenção Básica (Meta: 80%)", esperado: "80", 1: "62", 2: "65", 3: "71", rag: "71", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },
  { id: 18, title: "Implantação Prontuário Eletrônico (Meta: 100%)", esperado: "100", 1: "75", 2: "85", 3: "95", rag: "95", pol: Polarity.MAIOR, diretriz: D1, objetivo: O11 },

  // DIRETRIZ 1 - OBJETIVO 2 (Assistência Farmacêutica)
  { id: 19, title: "Cuidado farmacêutico em UBS urbanas (Meta: 50%)", esperado: "50", 1: "20", 2: "35", 3: "45", rag: "45", pol: Polarity.MAIOR, diretriz: D1, objetivo: O12 },
  { id: 20, title: "Implantar Farmácia Viva até 2025", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D1, objetivo: O12 },
  { id: 21, title: "Implantar Fitoterapia em 100% das UBS", esperado: "100", 1: "20", 2: "45", 3: "60", rag: "60", pol: Polarity.MAIOR, diretriz: D1, objetivo: O12 },
  { id: 22, title: "Ações de uso racional de medicamentos (1x/ano)", esperado: "1", 1: "0", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D1, objetivo: O12 },

  // DIRETRIZ 1 - OBJETIVO 3 (Redes de Atenção)
  { id: 23, title: "Reduzir Mortalidade Infantil (Meta: 10)", esperado: "10", 1: "12.8", 2: "11.5", 3: "10.2", rag: "10.2", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 24, title: "Reduzir Mortalidade Materna (Meta: 0)", esperado: "0", 1: "1", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 25, title: "Percentual de Parto Normal SUS (Meta: 60%)", esperado: "60", 1: "42", 2: "48", 3: "54", rag: "54", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 26, title: "Reduzir Sífilis Congênita (Meta: 20 casos)", esperado: "20", 1: "35", 2: "28", 3: "24", rag: "24", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 27, title: "Reduzir Taxa de Natalidade (Meta: 18%)", esperado: "18", 1: "21", 2: "20", 3: "19", rag: "19", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 28, title: "Internações causas sensíveis à AB (Meta: 21%)", esperado: "21", 1: "24", 2: "23", 3: "22", rag: "22", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 29, title: "Razão Exame Citopatológico 25-64 anos (Meta: 0.42)", esperado: "0.42", 1: "0.28", 2: "0.35", 3: "0.40", rag: "0.40", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 30, title: "Razão Mamografia Rastreamento 50-69 anos (Meta: 0.35)", esperado: "0.35", 1: "0.24", 2: "0.29", 3: "0.32", rag: "0.32", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 31, title: "Mortalidade Prematura DCNT (Meta: 113,51)", esperado: "113.51", 1: "180", 2: "160", 3: "145", rag: "145", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 32, title: "Participação de Idosos em Atividades Coletivas", esperado: "50", 1: "20", 2: "35", 3: "42", rag: "42", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 33, title: "Equipes eSF capacitadas em Envelhecimento", esperado: "80", 1: "30", 2: "55", 3: "70", rag: "70", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 34, title: "Reduzir internação de Idosos por Fratura de Fêmur", esperado: "3", 1: "4", 2: "3.5", 3: "3.2", rag: "3.2", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 35, title: "Idosos com Avaliação Multidimensional (Meta: 60%)", esperado: "60", 1: "15", 2: "32", 3: "48", rag: "48", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 36, title: "Cobertura Triagem Neonatal (Meta: 80%)", esperado: "80", 1: "45", 2: "62", 3: "75", rag: "75", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 37, title: "Habilitação do CER IV", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 38, title: "Atendimento Odontológico Pessoa com Deficiência", esperado: "60", 1: "20", 2: "38", 3: "52", rag: "52", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 39, title: "Recém-Nascidos com Apgar < 7 no 5º min (Meta: 1%)", esperado: "1", 1: "1.4", 2: "1.2", 3: "1.1", rag: "1.1", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 40, title: "Linha de cuidado para TEA implantada", esperado: "1", 1: "0", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 41, title: "Ações de Matriciamento CAPS/APS (Meta: +25%)", esperado: "25", 1: "10", 2: "18", 3: "22", rag: "22", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 42, title: "Notificações de tentativa de suicídio (Meta: +70%)", esperado: "70", 1: "25", 2: "45", 3: "62", rag: "62", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 43, title: "Reduzir reinternações por transtorno mental", esperado: "50", 1: "55", 2: "52", 3: "48", rag: "48", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 44, title: "Tempo de espera triagem Laranja (Meta: 10 min)", esperado: "10", 1: "15", 2: "12", 3: "11", rag: "11", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 45, title: "Óbitos em internações por AVC (Meta: 18%)", esperado: "18", 1: "21", 2: "20", 3: "19.5", rag: "19.5", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 46, title: "Óbitos em internações por Infarto (IAM)", esperado: "4.99", 1: "7", 2: "6.2", 3: "5.5", rag: "5.5", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 47, title: "Assistência hospitalar em acidentes (Meta: 60%)", esperado: "60", 1: "48", 2: "52", 3: "58", rag: "58", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },
  { id: 48, title: "Tempo resposta SAMU (Meta: 15 min)", esperado: "15", 1: "21", 2: "19", 3: "17", rag: "17", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 49, title: "Reduzir mortalidade externa masc. 20-59 anos", esperado: "12", 1: "15", 2: "14", 3: "13.2", rag: "13.2", pol: Polarity.MENOR, diretriz: D1, objetivo: O13 },
  { id: 50, title: "Procura consultas médicas masc. 20-59 anos", esperado: "0.1", 1: "0.05", 2: "0.07", 3: "0.09", rag: "0.09", pol: Polarity.MAIOR, diretriz: D1, objetivo: O13 },

  // DIRETRIZ 2 (MAC)
  { id: 51, title: "Procedimentos ambulatoriais média complexidade", esperado: "2", 1: "1", 2: "1.2", 3: "1.5", rag: "1.5", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 52, title: "Procedimentos de reabilitação (Meta: +50%)", esperado: "50", 1: "15", 2: "32", 3: "48", rag: "48", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 53, title: "Informatizar processos hospitalares (Meta: 100%)", esperado: "100", 1: "45", 2: "72", 3: "88", rag: "88", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 54, title: "Protocolos assistenciais implantados (Meta: 100%)", esperado: "100", 1: "30", 2: "55", 3: "82", rag: "82", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 55, title: "Taxa de ocupação leito hospitalar (Meta: 85%)", esperado: "85", 1: "72", 2: "78", 3: "84", rag: "84", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 56, title: "Taxa de mortalidade hospitalar (Meta: 3,5)", esperado: "3.5", 1: "4.2", 2: "3.9", 3: "3.7", rag: "3.7", pol: Polarity.MENOR, diretriz: D2, objetivo: O21 },
  { id: 57, title: "Taxa de infecção geral (Meta: 5%)", esperado: "5", 1: "6.8", 2: "6.1", 3: "5.4", rag: "5.4", pol: Polarity.MENOR, diretriz: D2, objetivo: O21 },
  { id: 58, title: "Tempo médio de internação (Meta: 4 dias)", esperado: "4", 1: "5.5", 2: "4.8", 3: "4.2", rag: "4.2", pol: Polarity.MENOR, diretriz: D2, objetivo: O21 },
  { id: 59, title: "Servidores treinados 30h/ano (Meta: 70%)", esperado: "70", 1: "15", 2: "42", 3: "61", rag: "61", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },
  { id: 60, title: "Evento sentinela zero", esperado: "0", 1: "2", 2: "1", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: D2, objetivo: O21 },
  { id: 61, title: "Satisfação do usuário (Meta: 85%)", esperado: "85", 1: "68", 2: "74", 3: "82", rag: "82", pol: Polarity.MAIOR, diretriz: D2, objetivo: O21 },

  // DIRETRIZ 3 (Vigilância)
  { id: 62, title: "Incidência de AIDS menores de 5 anos (Meta: 0)", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: D3, objetivo: O31 },
  { id: 63, title: "Análise água consumo humano (Meta: 100%)", esperado: "100", 1: "58", 2: "84", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 64, title: "Exame Anti-HIV casos novos TB (Meta: 100%)", esperado: "100", 1: "82", 2: "94", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 65, title: "Óbitos com causa básica definida (Meta: 98%)", esperado: "98", 1: "92", 2: "95", 3: "97.4", rag: "97.4", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 66, title: "Vacinas selecionadas cobertura 95% < 1 ano", esperado: "95", 1: "78", 2: "84", 3: "92", rag: "92", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 67, title: "Exame de contatos novos de Hanseníase (Meta: 85%)", esperado: "85", 1: "76", 2: "80", 3: "82.5", rag: "82.5", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 68, title: "Unidades com ações Hepatites Virais (Meta: 75%)", esperado: "75", 1: "67", 2: "68", 3: "72", rag: "72", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 69, title: "Encerramento notificações imediatas (60 dias)", esperado: "90", 1: "78", 2: "85", 3: "92", rag: "92", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 70, title: "Ações Vigilância Sanitária (Meta: 100%)", esperado: "100", 1: "45", 2: "82", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 71, title: "Manter casos autóctones Malária zero", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: D3, objetivo: O31 },
  { id: 72, title: "Notificação contínua violência doméstica", esperado: "33", 1: "18", 2: "22", 3: "29", rag: "29", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 73, title: "Manter óbitos por Dengue zero", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: D3, objetivo: O31 },
  { id: 74, title: "Investigação óbitos maternos (Meta: 100%)", esperado: "100", 1: "100", 2: "100", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 75, title: "Investigação óbitos MIF 10-49 anos (Meta: 90%)", esperado: "90", 1: "82", 2: "85", 3: "88.4", rag: "88.4", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 76, title: "Ações vigilância saúde do trabalhador (5/ano)", esperado: "5", 1: "1", 2: "3", 3: "5", rag: "5", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },
  { id: 77, title: "Cobertura imóveis controle vetorial Dengue (80%)", esperado: "80", 1: "65", 2: "74", 3: "82", rag: "82", pol: Polarity.MAIOR, diretriz: D3, objetivo: O31 },

  // DIRETRIZ 4 (Gestão)
  { id: 78, title: "Implantar Centros de Custos SUS (Meta: 100%)", esperado: "100", 1: "20", 2: "45", 3: "75", rag: "75", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 79, title: "Serviços com Educação Permanente (Meta: 100%)", esperado: "100", 1: "45", 2: "62", 3: "81", rag: "81", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 80, title: "Capacitação introdutória novos concursados", esperado: "100", 1: "100", 2: "100", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 81, title: "Profissionais em ações de Qualidade de Vida", esperado: "75", 1: "25", 2: "42", 3: "58", rag: "58", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 82, title: "Serviços com GTH implantados (Meta: 75%)", esperado: "75", 1: "30", 2: "45", 3: "62", rag: "62", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 83, title: "Projeto de articulação de talentos anual", esperado: "1", 1: "0", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 84, title: "Habilitação dos serviços ofertados (Meta: 90%)", esperado: "90", 1: "78", 2: "82", 3: "85", rag: "85", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 85, title: "Imóveis registrados (Meta: 40%)", esperado: "40", 1: "10", 2: "15", 3: "22", rag: "22", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 86, title: "Licença Operação Ambiental imóveis (Meta: 50%)", esperado: "50", 1: "15", 2: "25", 3: "38", rag: "38", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },
  { id: 87, title: "Habite-se prédios públicos (Meta: 50%)", esperado: "50", 1: "10", 2: "22", 3: "31", rag: "31", pol: Polarity.MAIOR, diretriz: D4, objetivo: O41 },

  // DIRETRIZ 5 (Investimentos)
  { id: 88, title: "Ampliar estrutura física de 07 UBS", esperado: "7", 1: "0", 2: "2", 3: "4", rag: "4", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 89, title: "Construir 06 Unidades Básicas de Saúde", esperado: "6", 1: "0", 2: "1", 3: "3", rag: "3", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 90, title: "Equipar 100% das unidades construídas/ampliadas", esperado: "100", 1: "0", 2: "50", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 91, title: "Construir Central de Imunização", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 92, title: "Construir Centro de Zoonoses", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 93, title: "Construir 02 Centros de Atenção Psicossocial", esperado: "2", 1: "0", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 94, title: "Construir 02 bases descentralizadas SAMU", esperado: "2", 1: "0", 2: "1", 3: "2", rag: "2", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 95, title: "Construir CER IV com oficina ortopédica", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 96, title: "Ampliar estrutura física do Pronto Socorro", esperado: "1", 1: "0", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 },
  { id: 97, title: "Construir 01 Heliponto", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: D5, objetivo: O51 }
];
