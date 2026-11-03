// ==========================================
// CONFIGURAÇÃO DECO PISOS — PISOS LAMINADOS E VINÍLICOS
// ==========================================

const CONFIG = {
    // 1. DADOS DA EMPRESA E ATENDIMENTO
    empresa: {
        nome1: "DECO",
        nome2: "PISOS", // Destaque na cor primária ouro (#E0A729)
        cidade: "Mogi Guaçu, Mogi Mirim, Jaguariúna e Região",
        whatsapp: "5521997715563", // +55 21 99771-5563
        telefoneExibicao: "(21) 99771-5563",
        tempoMercado: "8 anos de experiência",
        cnpj: "62.685.501/0001-06",
        garantiaInstalacao: "1 ano",
        garantiaProduto: "De 7 a 25 anos (e vitalícia em linhas selecionadas)"
    },

    // 2. OPÇÕES DE PISOS E PREÇOS (CONFORME BRIEFING OFICIAL)
    // ⚠️ Valores por m² com mão de obra própria qualificada de fábrica inclusa
    pisos: [
        {
            categoria: "Pisos Vinílicos de Alto Padrão (100% Resistentes à Água)",
            nome: "Piso Vinílico Colado LVT (Tarkett / Quick-Step / Ecomex)",
            preco: 294.00,
            sobConsulta: false,
            // R$ 294,00/m² conforme briefing
            descricao: "Pacote Completo: Piso Vinílico Colado LVT + Massa de Nivelamento + Cola Especial + Mão de Obra Própria Qualificada de Fábrica. Máximo conforto térmico e acústico."
        },
        {
            categoria: "Pisos Vinílicos de Alto Padrão (100% Resistentes à Água)",
            nome: "Piso Vinílico Click SPC Rígido (Quick-Step / Graddus / Pix)",
            preco: 290.00,
            sobConsulta: false,
            // R$ 290,00/m² conforme briefing
            descricao: "Pacote Completo: Piso Vinílico Click SPC (sem uso de cola) + Manta Acústica Integrada + Perfis de Transição + Instalação Especializada Própria."
        },
        {
            categoria: "Pisos Laminados de Alta Durabilidade",
            nome: "Piso Laminado Linha Premium (Quick-Step / Tarkett)",
            preco: 239.90,
            sobConsulta: false,
            // R$ 239,90/m² conforme briefing
            descricao: "Pacote Completo: Piso Laminado de Alta Resistência + Manta de Amortecimento + Perfis de Acabamento + Mão de Obra Própria da Loja."
        },
        {
            categoria: "Pisos Especiais & Paginações Autorais",
            nome: "Piso Vinílico Chevron / Espinha de Peixe (Design Nobre)",
            preco: null,
            sobConsulta: true,
            descricao: "Pacote Arquitetônico: Paginação nobre Chevron ou Espinha de Peixe com cortes angulares milimétricos e acabamento de luxo. Consulte padrões disponíveis."
        }
    ],

    // 3. OPÇÕES DE PISO ATUAL NO LOCAL (Select)
    opcoesPisoAtual: [
        { valor: "Contrapiso", texto: "Contrapiso (Cimento)" },
        { valor: "Ceramica", texto: "Cerâmica / Porcelanato" },
        { valor: "Madeira", texto: "Madeira / Taco / Assoalho" },
        { valor: "Vinilico", texto: "Vinílico (existente)" },
        { valor: "Outro", texto: "Outro / Avaliar na Visita Técnica" }
    ],

    // 4. BÔNUS E INCLUSÕES NO ORÇAMENTO (Modal de Resultado Executivo)
    bonus: [
        { titulo: "Mão de Obra Própria da Loja (Qualificada de Fábrica)", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "10% de Desconto para Pagamento à Vista", subtitulo: "DISPONÍVEL", strike: "", gratis: true },
        { titulo: "Parcelamento em até 10x Sem Juros no Cartão", subtitulo: "DISPONÍVEL", strike: "", gratis: true },
        { titulo: "1 Ano de Garantia Técnica na Instalação", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Garantia de 7 a 25 Anos de Fábrica nos Produtos", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Visita Técnica e Medição no Local", subtitulo: "CORTESIA*", strike: "R$ 150", gratis: true },
        { titulo: "8 Anos de Experiência e Mais de Milhares de m² Instalados", subtitulo: "COMPROVADO", strike: "", gratis: true }
    ]
};
