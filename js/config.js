// ==========================================
// CONFIGURAÇÃO DECO PISOS — KITS DE PISOS LAMINADOS E VINÍLICOS
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
        garantiaProduto: "De 7 a 25 anos de fábrica",
        site: "www.decopisos.com.br",
        instagram: "@decopisosrj"
    },

    // 2. KITS OFICIAIS DE PISOS (EXCLUSIVOS CONFORME CAMPANHA)
    // ⚠️ Somente materiais. Instalação não inclusa.
    // ⚠️ Kit mínimo de 10 m². Para áreas menores, aplica-se o valor do kit mínimo.
    pisos: [
        {
            id: "laminado-mata-atlantica",
            categoria: "Kits de Pisos Laminados",
            nome: "Kit Piso Laminado — Linha Mata Atlântica",
            linha: "Linha Mata Atlântica",
            precoM2: 199.90,
            metragemMinima: 10,
            precoMinimo: 1999.00,
            cores: ["Pitanga", "Amêndola", "Oliver", "Orquídea"],
            itensBase: [
                "10 m² de piso laminado Linha Mata Atlântica",
                "10 m² de manta Eucafloor 2 mm",
                "4 barras de rodapé branco Eucafloor 7 cm (2,40 m)",
                "1 barra de perfil T ou redutor Eucafloor (1,80 m)"
            ],
            composicaoResumida: "10 m² piso laminado + manta Eucafloor 2mm + 4 barras rodapé 7cm + 1 barra perfil T/redutor",
            descricaoCompleta: "Composição base (10 m²): 10 m² de piso laminado Linha Mata Atlântica + 10 m² de manta Eucafloor 2 mm + 4 barras de rodapé branco Eucafloor 7 cm (2,40 m) + 1 barra de perfil T ou redutor Eucafloor (1,80 m). Quantidades ajustadas proporcionalmente à metragem e embalagens.",
            aviso: "Somente materiais. Instalação não inclusa. Kit mínimo de 10 m² por R$ 1.999,00."
        },
        {
            id: "vinilico-eco-home",
            categoria: "Kits de Pisos Vinílicos",
            nome: "Kit Piso Vinílico — Ecomex • Linha Eco Home 2 mm",
            linha: "Ecomex • Linha Eco Home 2 mm",
            precoM2: 299.90,
            metragemMinima: 10,
            precoMinimo: 2999.00,
            cores: ["Nice", "Lyon", "Bize", "Versalhes"],
            itensBase: [
                "10 m² de piso vinílico Ecomex Eco Home 2 mm",
                "1 unidade de cola vinílica Protec 4 kg",
                "5 sacos de massa autonivelante Protec Base 20 kg",
                "1 galão de primer Multibases Protec 5 L",
                "4 barras de rodapé branco Eucafloor 7 cm (2,40 m)"
            ],
            composicaoResumida: "10 m² piso vinílico + cola Protec 4kg + 5 sacos massa autonivelante 20kg + 1 galão primer 5L + 4 barras rodapé 7cm",
            descricaoCompleta: "Composição base (10 m²): 10 m² de piso vinílico Ecomex Eco Home 2 mm + 1 unidade de cola vinílica Protec 4 kg + 5 sacos de massa autonivelante Protec Base 20 kg + 1 galão de primer Multibases Protec 5 L + 4 barras de rodapé branco Eucafloor 7 cm (2,40 m). Quantidades ajustadas proporcionalmente à metragem e embalagens.",
            aviso: "Somente materiais. Instalação não inclusa. Kit mínimo de 10 m² por R$ 2.999,00."
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
        { titulo: "Kit Completo de Materiais de Fábrica", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Piso + Acabamentos + Insumos de Fixação/Nivelamento", subtitulo: "INCLUSO NO KIT", strike: "", gratis: true },
        { titulo: "10% de Desconto para Pagamento à Vista", subtitulo: "DISPONÍVEL", strike: "", gratis: true },
        { titulo: "Parcelamento em até 10x Sem Juros no Cartão", subtitulo: "DISPONÍVEL", strike: "", gratis: true },
        { titulo: "Garantia de 7 a 25 Anos de Fábrica nos Produtos", subtitulo: "INCLUSO", strike: "", gratis: true },
        { titulo: "Cotação de Instalação Especializada (Opcional)", subtitulo: "SOB CONSULTA", strike: "", gratis: false },
        { titulo: "Consultoria de Metragem e Suporte Técnico", subtitulo: "CORTESIA", strike: "R$ 150", gratis: true }
    ]
};
