// ========================================================
// MÁQUINA DE ORÇAMENTOS DECO PISOS — LÓGICA DE SIMULAÇÃO
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    inicializarDadosEstruturais();
});

// 1. POPULA OS DADOS ESTRUTURAIS (Header, Selects, Cores, Bônus)
function inicializarDadosEstruturais() {
    // 1.1 Whatsapp Header Link
    const headerZapBtn = document.getElementById('headerZapBtn');
    if (headerZapBtn) {
        headerZapBtn.href = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de tirar dúvidas sobre os Kits de Pisos Laminados e Vinílicos da Deco Pisos.")}`;
    }

    // 1.2 Popular Select de Piso Atual
    const pisoAtualSelect = document.getElementById('pisoAtual');
    if (pisoAtualSelect) {
        pisoAtualSelect.innerHTML = '';
        CONFIG.opcoesPisoAtual.forEach(op => {
            const tempOption = document.createElement('option');
            tempOption.value = op.valor;
            tempOption.innerText = op.texto;
            pisoAtualSelect.appendChild(tempOption);
        });
    }

    // 1.3 Popular Select de Kits de Piso
    const modeloSelect = document.getElementById('modelo');
    if (modeloSelect) {
        modeloSelect.innerHTML = '';
        
        CONFIG.pisos.forEach((piso, index) => {
            const tempOption = document.createElement('option');
            tempOption.value = piso.id;
            
            const precoFormatado = piso.precoM2.toFixed(2).replace('.', ',');
            const precoMinimoFormatado = piso.precoMinimo.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
            tempOption.innerText = `${piso.nome} — R$ ${precoFormatado}/m² (Mínimo: R$ ${precoMinimoFormatado})`;
            
            if (index === 0) tempOption.selected = true;
            modeloSelect.appendChild(tempOption);
        });

        // Event listener para troca de kit atualizar as cores
        modeloSelect.addEventListener('change', aoMudarModelo);
        
        // Atualiza as cores para o primeiro kit logo no carregamento
        aoMudarModelo();
    }

    // 1.4 Popular Lista de Bônus no Modal
    const bonusListContainer = document.getElementById('bonusListRenderer');
    if (bonusListContainer) {
        bonusListContainer.innerHTML = '';
        CONFIG.bonus.forEach(bonus => {
            const div = document.createElement('div');
            div.className = 'bonus-item';
            
            const badgeClass = bonus.gratis ? (bonus.strike ? 'badge-courtesy' : 'badge-included') : 'badge-optional';
            const iconClass = bonus.gratis ? 'fa-check-circle' : 'fa-info-circle';
            let strikeHtml = bonus.strike ? `<span class="strike">${bonus.strike}</span> ` : '';
            
            div.innerHTML = `
                <div class="bonus-item-title">
                    <i class="fas ${iconClass}"></i>
                    <span>${bonus.titulo}</span>
                </div>
                <div class="bonus-item-status">
                    ${strikeHtml}<span class="bonus-badge ${badgeClass}">${bonus.subtitulo}</span>
                </div>
            `;
            bonusListContainer.appendChild(div);
        });
    }
}

// 2. ATUALIZAÇÃO DINÂMICA DE CORES AO TROCAR O MODELO
function aoMudarModelo() {
    const modeloSelect = document.getElementById('modelo');
    const corSelect = document.getElementById('cor');
    if (!modeloSelect || !corSelect) return;

    const pisoId = modeloSelect.value;
    const piso = CONFIG.pisos.find(p => p.id === pisoId) || CONFIG.pisos[0];

    corSelect.innerHTML = '';
    if (piso && piso.cores && piso.cores.length > 0) {
        piso.cores.forEach((cor, idx) => {
            const opt = document.createElement('option');
            opt.value = cor;
            opt.innerText = `${cor}`;
            if (idx === 0) opt.selected = true;
            corSelect.appendChild(opt);
        });
    }
}

// 3. FUNÇÃO DE CÁLCULO E ABERTURA DO MODAL
function calcular() {
    const metragemInput = document.getElementById('metragem').value;
    const metragem = parseFloat(metragemInput.replace(',', '.'));
    
    if (isNaN(metragem) || metragem <= 0) {
        alert("Por favor, digite uma metragem válida maior que zero.");
        return;
    }

    const modeloEl = document.getElementById('modelo');
    if (!modeloEl || !modeloEl.value) {
        alert("Por favor, selecione um kit de piso.");
        return;
    }

    const pisoId = modeloEl.value;
    const pisoData = CONFIG.pisos.find(p => p.id === pisoId);
    if (!pisoData) {
        alert("Kit selecionado não encontrado.");
        return;
    }

    const corEl = document.getElementById('cor');
    const corEscolhida = (corEl && corEl.value) ? corEl.value : 'Padrão';

    const pisoAtual = document.getElementById('pisoAtual');
    const pisoAtualNome = (pisoAtual && pisoAtual.options && pisoAtual.selectedIndex >= 0) 
        ? (pisoAtual.options[pisoAtual.selectedIndex].text || pisoAtual.value) 
        : 'Não informado';
    
    const nivelamentoEl = document.getElementById('nivelamento');
    const nivelamentoNome = (nivelamentoEl && nivelamentoEl.options && nivelamentoEl.selectedIndex >= 0) 
        ? (nivelamentoEl.options[nivelamentoEl.selectedIndex].text || nivelamentoEl.value) 
        : 'Não informado';

    // Regra Comercial do Kit Mínimo de 10 m²:
    // "Para áreas menores, aplica-se o valor do kit mínimo."
    let total = 0;
    let aplicouKitMinimo = false;

    if (metragem < pisoData.metragemMinima) {
        total = pisoData.precoMinimo;
        aplicouKitMinimo = true;
    } else {
        total = metragem * pisoData.precoM2;
        aplicouKitMinimo = false;
    }

    // Formatação de Valores
    const valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const parcela10 = (total / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const valorAVista = (total * 0.90).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Atualização visual no Modal
    const totalLabel = document.querySelector('.total-label');
    const valorFinal = document.getElementById('valorFinal');
    const installmentsText = document.getElementById('installmentsText');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const linkZap = document.getElementById('linkZap');

    if (totalLabel) {
        totalLabel.innerHTML = aplicouKitMinimo 
            ? `Investimento Total <span class="badge-minimo-pill">Kit Mínimo Aplicado (10 m²)</span>`
            : `Investimento Total Estimado (Materiais)`;
    }

    if (valorFinal) {
        valorFinal.innerText = valorFormatado;
    }

    if (installmentsText) {
        installmentsText.innerHTML = `Até <strong>10x de ${parcela10} sem juros</strong> ou <strong>${valorAVista} à vista</strong> (10% OFF)`;
    }

    if (modalSubtitle) {
        let escopoHtml = `
            <div class="modal-scope-item"><strong>Kit Selecionado:</strong> ${pisoData.nome}</div>
            <div class="modal-scope-item"><strong>Cor Selecionada:</strong> <span class="badge-color-tag">${corEscolhida}</span></div>
            <div class="modal-scope-item"><strong>Metragem Solicitada:</strong> ${metragem} m² ${aplicouKitMinimo ? `<em>(Cálculo baseado no Kit Mínimo de 10 m²)</em>` : ''}</div>
            <div class="modal-scope-item" style="margin-top: 8px;"><strong>Composição dos Materiais:</strong><br>${pisoData.descricaoCompleta}</div>
            <div class="modal-scope-notice"><i class="fas fa-exclamation-triangle"></i> <strong>Atenção:</strong> Somente materiais inclusos. Mão de obra de instalação não inclusa. Consulte cotação de instalação e entrega via WhatsApp.</div>
        `;
        modalSubtitle.innerHTML = escopoHtml;
    }

    // Mensagem Formatada para o WhatsApp
    const precoMinimoFormatado = pisoData.precoMinimo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    let textoZap = `Olá! Fiz uma simulação de orçamento na Deco Pisos:\n\n` +
        `📐 *Metragem Estimada:* ${metragem} m²\n` +
        `📦 *Kit Selecionado:* ${pisoData.nome}\n` +
        `🎨 *Cor Escolhida:* ${corEscolhida}\n` +
        (aplicouKitMinimo ? `⚠️ *Nota:* Para metragens abaixo de 10 m², aplica-se o valor do Kit Mínimo (${precoMinimoFormatado}).\n` : '') +
        `💰 *Investimento Estimado (Materiais):* ${valorFormatado}\n` +
        `💳 *Condições:* Em até 10x de ${parcela10} sem juros ou ${valorAVista} à vista (10% OFF)\n\n` +
        `📋 *Composição dos Materiais:*\n` +
        pisoData.itensBase.map(it => `• ${it}`).join('\n') + `\n\n` +
        `ℹ️ *Local da Obra:*\n` +
        `- Piso Atual: ${pisoAtualNome}\n` +
        `- Nivelamento: ${nivelamentoNome}\n\n` +
        `⚠️ *Aviso do Flyer:* Somente materiais. Instalação não inclusa.\n\n` +
        `Gostaria de verificar a disponibilidade do produto e consultar a taxa de entrega / cotação de instalação!`;

    const link = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent(textoZap)}`;
    if (linkZap) {
        linkZap.href = link;
    }

    // Abre o Modal
    const modalResult = document.getElementById('modalResult');
    if (modalResult) {
        modalResult.style.display = 'flex';
    }

    // Dispara Evento pro Pixel
    if (typeof trackLead === 'function') {
        trackLead(total);
    }
}

// 4. FECHAR MODAL
function fecharModal() {
    const modal = document.getElementById('modalResult');
    if (modal) modal.style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('modalResult');
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
