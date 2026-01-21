
import { Polarity } from './types';

export const CALCULATION_METHODS: { [key: number]: string } = {
  1: "Cobertura ACS: (ACS cadastrados / População Estimada/575) * 100",
  10: "Taxa de Gravidez na Adolescência: (Nascidos vivos mães 10-19 anos / Total Nascidos Vivos) * 100",
  11: "Cobertura Vacinal: Média VIP e Pentavalente em menores de 1 ano",
  23: "Mortalidade Infantil: Óbitos < 1 ano por 1.000 nascidos vivos",
  28: "Internações por Condições Sensíveis à Atenção Primária (ICSAP)",
  31: "Taxa de Mortalidade Prematura por DCNT (30 a 69 anos)",
  66: "Cobertura das Vacinas do Calendário Básico em crianças < 1 ano",
  78: "Implantação de Centros de Custos: Unidades com sistema operacional/Total",
  // Métodos genéricos para as demais metas de infraestrutura
};

// Definição das Diretrizes e Objetivos
const DIR1 = "D1 - Fortalecimento da Atenção Primária e RAS";
const DIR2 = "D2 - Média e Alta Complexidade Ambulatorial e Hospitalar";
const DIR3 = "D3 - Vigilância em Saúde";
const DIR4 = "D4 - Gestão do SUS, Informação e Educação Permanente";
const DIR5 = "D5 - Investimentos em Saúde (Obras e Equipamentos)";

const OBJ11 = "1.1 - Aprimorar Ações Estratégicas e RAS (Promoção e Prevenção)";
const OBJ12 = "1.2 - Assistência Farmacêutica";
const OBJ13 = "1.3 - Integração Sistêmica e Redes de Atenção";
const OBJ21 = "2.1 - Acesso e Qualificação na Média/Alta Complexidade";
const OBJ31 = "3.1 - Controle de Doenças, Agravos e Vigilância Sanitária";
const OBJ41 = "4.1 - Valorização de Servidores e Planejamento";
const OBJ51 = "5.1 - Infraestrutura (Construção e Equipamentos)";

export const DATA_2024_RAW = [
  // DIRETRIZ 1 - OBJETIVO 1.1 (Metas 1-18)
  { id: 1, title: "Cobertura de Agentes Comunitários de Saúde (Meta: 80%)", esperado: "80", 1: "73,85", 2: "75,14", 3: "72,73", rag: "72,73", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 2, title: "Ações Assistenciais Básicas População Indígena (03x/ano)", esperado: "3", 1: "0", 2: "2", 3: "3", rag: "3", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 3, title: "Assistência Oftalmológica no PSE (Meta: 100% das escolas)", esperado: "100", 1: "43,24", 2: "48,64", 3: "48,64", rag: "48,64", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 4, title: "Acompanhamento Bolsa Família (Meta: 80%)", esperado: "80", 1: "54,24", 2: "72,04", 3: "72,56", rag: "72,56", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 5, title: "Cobertura Estratégia Saúde da Família (Meta: 80%)", esperado: "80", 1: "89,65", 2: "74,48", 3: "82,37", rag: "82,37", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 6, title: "Cobertura Equipes Atenção Básica (Meta: 92%)", esperado: "92", 1: "97,47", 2: "97,66", 3: "97,47", rag: "97,47", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 7, title: "Assistência Multiprofissional na APS (Meta: 64,00)", esperado: "64", 1: "12,62", 2: "12,05", 3: "36,7", rag: "36,7", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 8, title: "Oferta de Exames Laboratoriais nas UBS (Meta: 50%)", esperado: "50", 1: "10,12", 2: "5,97", 3: "15,18", rag: "15,18", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 9, title: "Reduzir quantitativo de crianças no programa APLV (Redução 10%)", esperado: "7,5", 1: "0", 2: "53", 3: "63", rag: "63", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 10, title: "Reduzir gravidez na adolescência 10-19 anos (Meta: 14,50%)", esperado: "14,5", 1: "14,95", 2: "14,57", 3: "12,83", rag: "12,83", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 11, title: "Cobertura Vacina Poliomielite e Pentavalente (Meta: 95%)", esperado: "95", 1: "60", 2: "61", 3: "70,01", rag: "70,01", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 12, title: "Diabéticos com Hemoglobina Glicada (Meta: 90%)", esperado: "90", 1: "32", 2: "23", 3: "26,49", rag: "26,49", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 13, title: "Gestantes com 06+ Consultas Pré-natal (Meta: 80%)", esperado: "80", 1: "44", 2: "51", 3: "45,99", rag: "45,99", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 14, title: "Gestantes com Exames Sífilis e HIV (Meta: 95%)", esperado: "95", 1: "71", 2: "69", 3: "73,73", rag: "73,73", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 15, title: "Hipertensos com Pressão Arterial Aferida (Meta: 90%)", esperado: "90", 1: "27", 2: "24", 3: "60,47", rag: "60,47", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 16, title: "Gestantes com Atendimento Odontológico (Meta: 90%)", esperado: "90", 1: "63", 2: "70", 3: "68,91", rag: "68,91", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 17, title: "Acesso Atenção Odontológica na APS (Meta: 80%)", esperado: "80", 1: "53,6", 2: "53,00", 3: "38,94", rag: "38,94", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },
  { id: 18, title: "Implantação Prontuário Eletrônico nas UBS (Meta: 100%)", esperado: "100", 1: "100", 2: "100", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ11 },

  // DIRETRIZ 1 - OBJETIVO 2 (Metas 19-22)
  { id: 19, title: "Cuidado Farmacêutico nas UBS Urbanas (Meta: 50%)", esperado: "50", 1: "0", 2: "10", 3: "20", rag: "20", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ12 },
  { id: 20, title: "Implantar Farmácia Viva", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ12 },
  { id: 21, title: "Implantar Fitoterapia em 100% das UBS", esperado: "100", 1: "10", 2: "25", 3: "40", rag: "40", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ12 },
  { id: 22, title: "Ações de Uso Racional de Medicamentos (01/ano)", esperado: "1", 1: "1", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ12 },

  // DIRETRIZ 1 - OBJETIVO 3 (Metas 23-50)
  { id: 23, title: "Reduzir Mortalidade Infantil (Meta: 10)", esperado: "10", 1: "11,2", 2: "10,8", 3: "10,5", rag: "10,5", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 24, title: "Reduzir Mortalidade Materna (Meta: 0)", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 25, title: "Percentual de Parto Normal no SUS (Meta: 60%)", esperado: "60", 1: "39", 2: "42", 3: "45", rag: "45", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 26, title: "Reduzir Sífilis Congênita (Meta: 20 casos)", esperado: "20", 1: "45", 2: "38", 3: "30", rag: "30", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 27, title: "Reduzir Taxa de Natalidade (Meta: 18%)", esperado: "18", 1: "21", 2: "20", 3: "19", rag: "19", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 28, title: "Reduzir Internações Causas Sensíveis APS (Meta: 21%)", esperado: "21", 1: "23,5", 2: "22,8", 3: "22,1", rag: "22,1", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 29, title: "Razão de Exames Citopatológicos 25-64 anos (Meta: 0,42)", esperado: "0,42", 1: "0,28", 2: "0,31", 3: "0,35", rag: "0,35", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 30, title: "Razão Mamografia Rastreamento 50-69 anos (Meta: 0,35)", esperado: "0,35", 1: "0,24", 2: "0,26", 3: "0,29", rag: "0,29", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 31, title: "Mortalidade Prematura Doenças Crônicas (Meta: 113,51)", esperado: "113,51", 1: "180", 2: "165", 3: "150", rag: "150", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 32, title: "Participação de Idosos em Atividades Coletivas (Meta: 50%)", esperado: "50", 1: "15", 2: "22", 3: "30", rag: "30", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 33, title: "Equipes APS Capacitadas em Envelhecimento (Meta: 80%)", esperado: "80", 1: "40", 2: "55", 3: "65", rag: "65", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 34, title: "Internação de Idosos por Fratura de Fêmur (Redução 3%)", esperado: "3", 1: "0", 2: "1", 3: "2", rag: "2", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 35, title: "Idosos com Avaliação Multidimensional (Meta: 60%)", esperado: "60", 1: "12", 2: "25", 3: "38", rag: "38", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 36, title: "Cobertura Triagem Neonatal - Teste Pezinho (Meta: 80%)", esperado: "80", 1: "42", 2: "55", 3: "68", rag: "68", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 37, title: "Implantar CER IV", esperado: "1", 1: "0", 2: "0,5", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 38, title: "Atendimento Odontológico PcD (Meta: 60%)", esperado: "60", 1: "18", 2: "32", 3: "45", rag: "45", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 39, title: "Recém-Nascidos com Apgar < 7 no 5º min (Meta: 1%)", esperado: "1", 1: "1,4", 2: "1,3", 3: "1,2", rag: "1,2", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 40, title: "Implantar Linha de Cuidado TEA", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 41, title: "Matriciamento CAPS com APS (Aumento 25%/ano)", esperado: "25", 1: "10", 2: "15", 3: "25", rag: "25", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 42, title: "Notificação Tentativa de Suicídio (Aumento 70%)", esperado: "70", 1: "20", 2: "45", 3: "70", rag: "70", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 43, title: "Reduzir Internações por Transtorno Mental (Redução 50%)", esperado: "50", 1: "10", 2: "30", 3: "40", rag: "40", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 44, title: "Tempo espera Triagem Laranja (Meta: 10 min)", esperado: "10", 1: "15", 2: "12", 3: "11", rag: "11", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 45, title: "Óbitos por AVC nas Internações (Meta: 18%)", esperado: "18", 1: "20", 2: "19", 3: "18,5", rag: "18,5", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 46, title: "Óbitos por Infarto Agudo Miocárdio (Meta: 4,99)", esperado: "4,99", 1: "6,5", 2: "5,8", 3: "5,2", rag: "5,2", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 47, title: "Pessoas Assistidas em Hospitais por Acidentes (Meta: 60%)", esperado: "60", 1: "50", 2: "53", 3: "56", rag: "56", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 48, title: "Tempo Resposta SAMU (Meta: 15 min)", esperado: "15", 1: "20", 2: "18", 3: "17", rag: "17", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 49, title: "Mortalidade Causas Externas Homens 20-59 (Redução 12%)", esperado: "12", 1: "2", 2: "5", 3: "8", rag: "8", pol: Polarity.MENOR, diretriz: DIR1, objetivo: OBJ13 },
  { id: 50, title: "Consultas Médicas APS Homens 20-59 (Aumento 0,10/ano)", esperado: "0,10", 1: "0,02", 2: "0,05", 3: "0,08", rag: "0,08", pol: Polarity.MAIOR, diretriz: DIR1, objetivo: OBJ13 },

  // DIRETRIZ 2 (Metas 51-61)
  { id: 51, title: "Procedimentos Médias Complexidade Pop. Residente (Meta: 2%)", esperado: "2", 1: "1,2", 2: "1,4", 3: "1,6", rag: "1,6", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 52, title: "Aumento Procedimentos Reabilitação (50%)", esperado: "50", 1: "10", 2: "25", 3: "40", rag: "40", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 53, title: "Informatização Processos Hospitalares (100%)", esperado: "100", 1: "40", 2: "70", 3: "90", rag: "90", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 54, title: "Protocolos Implantados Unidades Assistenciais (100%)", esperado: "100", 1: "30", 2: "60", 3: "80", rag: "80", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 55, title: "Taxa Ocupação Leito Hospitalar (85%)", esperado: "85", 1: "70", 2: "75", 3: "82", rag: "82", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 56, title: "Redução Taxa Mortalidade Hospitalar (3,50)", esperado: "3,5", 1: "4,2", 2: "3,9", 3: "3,7", rag: "3,7", pol: Polarity.MENOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 57, title: "Redução Taxa Infecção Geral (5%)", esperado: "5", 1: "8", 2: "7", 3: "6,5", rag: "6,5", pol: Polarity.MENOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 58, title: "Tempo Médio Internação Hospitalar (04 dias)", esperado: "4", 1: "6", 2: "5,5", 3: "5", rag: "5", pol: Polarity.MENOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 59, title: "Servidores Treinados 30h/ano (70%)", esperado: "70", 1: "20", 2: "45", 3: "60", rag: "60", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 60, title: "Reduzir Evento Sentinela a Zero", esperado: "0", 1: "2", 2: "1", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: DIR2, objetivo: OBJ21 },
  { id: 61, title: "Satisfação do Usuário (85%)", esperado: "85", 1: "65", 2: "72", 3: "80", rag: "80", pol: Polarity.MAIOR, diretriz: DIR2, objetivo: OBJ21 },

  // DIRETRIZ 3 (Metas 62-77)
  { id: 62, title: "Incidência AIDS < 5 anos (Meta: 0)", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 63, title: "Análise Amostras Água - Coliformes/Cloro (100%)", esperado: "100", 1: "60", 2: "85", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 64, title: "Exame Anti-HIV casos novos Tuberculose (100%)", esperado: "100", 1: "70", 2: "90", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 65, title: "Registro Óbitos com Causa Básica Definida (98%)", esperado: "98", 1: "95", 2: "97", 3: "98,5", rag: "98,5", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 66, title: "Vacinas Selecionadas Crianças < 1 ano (95%)", esperado: "95", 1: "65", 2: "78", 3: "88", rag: "88", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 67, title: "Contatos Examinados Hanseníase (85%)", esperado: "85", 1: "78", 2: "80", 3: "82", rag: "82", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 68, title: "Unidades com Ações Hepatites Virais (75%)", esperado: "75", 1: "68", 2: "70", 3: "72", rag: "72", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 69, title: "Encerrar Doenças Compulsórias < 60 dias (90%)", esperado: "90", 1: "75", 2: "82", 3: "88", rag: "88", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 70, title: "Grupos de Ações Vigilância Sanitária (100%)", esperado: "100", 1: "40", 2: "75", 3: "90", rag: "90", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 71, title: "Casos Autóctones Malária (Zero)", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 72, title: "Unidades Notificação Violência Doméstica (Meta: 33)", esperado: "33", 1: "20", 2: "25", 3: "30", rag: "30", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 73, title: "Óbitos por Dengue (Zero)", esperado: "0", 1: "0", 2: "0", 3: "0", rag: "0", pol: Polarity.MENOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 74, title: "Investigação Óbitos Maternos (100%)", esperado: "100", 1: "100", 2: "100", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 75, title: "Investigação Óbitos MIF 10-49 anos (90%)", esperado: "90", 1: "80", 2: "85", 3: "90", rag: "90", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 76, title: "Ações Vigilância Saúde Trabalhador (05/ano)", esperado: "5", 1: "1", 2: "3", 3: "4", rag: "4", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },
  { id: 77, title: "Cobertura Visita Controle Dengue (80%)", esperado: "80", 1: "50", 2: "65", 3: "75", rag: "75", pol: Polarity.MAIOR, diretriz: DIR3, objetivo: OBJ31 },

  // DIRETRIZ 4 (Metas 78-87)
  { id: 78, title: "Gestão Centros de Custos Rede SUS (100%)", esperado: "100", 1: "20", 2: "45", 3: "60", rag: "60", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 79, title: "Serviços com Educação Permanente (100%)", esperado: "100", 1: "40", 2: "75", 3: "90", rag: "90", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 80, title: "Capacitação Introdutória Novos Servidores (100%)", esperado: "100", 1: "100", 2: "100", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 81, title: "Ações Qualidade de Vida Trabalhador (75%)", esperado: "75", 1: "15", 2: "35", 3: "50", rag: "50", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 82, title: "Implantação GTH nos Serviços Saúde (75%)", esperado: "75", 1: "25", 2: "50", 3: "65", rag: "65", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 83, title: "Projeto Articulação Talentos SEMSA (01/ano)", esperado: "1", 1: "1", 2: "1", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 84, title: "Habilitação Serviços Ofertados (90%)", esperado: "90", 1: "60", 2: "75", 3: "85", rag: "85", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 85, title: "Imóveis Registrados (40%)", esperado: "40", 1: "10", 2: "18", 3: "25", rag: "25", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 86, title: "Licença Operação Ambiental Imóveis (50%)", esperado: "50", 1: "10", 2: "22", 3: "35", rag: "35", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },
  { id: 87, title: "Habite-se Prédios Públicos (50%)", esperado: "50", 1: "5", 2: "15", 3: "25", rag: "25", pol: Polarity.MAIOR, diretriz: DIR4, objetivo: OBJ41 },

  // DIRETRIZ 5 (Metas 88-97)
  { id: 88, title: "Ampliar Estrutura 07 UBS", esperado: "7", 1: "0", 2: "2", 3: "4", rag: "4", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 89, title: "Construir 06 UBS", esperado: "6", 1: "0", 2: "1", 3: "2", rag: "2", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 90, title: "Equipar UBS Ampliadas/Construídas (100%)", esperado: "100", 1: "0", 2: "50", 3: "100", rag: "100", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 91, title: "Construir Central de Imunização", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 92, title: "Construir Centro de Zoonoses", esperado: "1", 1: "0", 2: "0,5", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 93, title: "Construir 02 CAPS (II e I)", esperado: "2", 1: "0", 2: "1", 3: "2", rag: "2", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 94, title: "Construir 02 Bases Descentralizadas SAMU", esperado: "2", 1: "0", 2: "1", 3: "2", rag: "2", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 95, title: "Construir Centro Reabilitação IV + Oficina Ortopédica", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 96, title: "Ampliar Estrutura Pronto Socorro", esperado: "1", 1: "0", 2: "0,5", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 },
  { id: 97, title: "Construir 01 Heliponto", esperado: "1", 1: "0", 2: "0", 3: "1", rag: "1", pol: Polarity.MAIOR, diretriz: DIR5, objetivo: OBJ51 }
];
