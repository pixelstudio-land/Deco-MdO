// Função que é chamada ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    inicializarDadosEstruturais();
});

// 1. POPULA OS DADOS VISUAIS (Logo, Nomes, Selects, Bônus)
function inicializarDadosEstruturais() {
    // 1.1 Nome da Marca (Header e Footer)
    const brandElements = document.querySelectorAll('.dynamic-brand');
    brandElements.forEach(el => {
        el.innerHTML = `${CONFIG.empresa.nome1} <span style="color: var(--primary);">${CONFIG.empresa.nome2}</span>`;
    });
    
    // Altera nomes em títulos de feature
    const h2BrandElements = document.querySelectorAll('.dynamic-feature-brand');
    h2BrandElements.forEach(el => {
        el.innerHTML = `<span style="color:var(--primary)">${CONFIG.empresa.nome1} ${CONFIG.empresa.nome2}</span>`;
    });

    // 1.2 Whatsapp Header Link
    const headerZapBtn = document.getElementById('headerZapBtn');
    if (headerZapBtn) {
        headerZapBtn.href = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de tirar dúvidas sobre os pisos laminados e vinílicos da Deco Pisos.")}`;
    }

    // 1.3 Popular Options de Piso Atual
    const pisoAtualSelect = document.getElementById('pisoAtual');
    if (pisoAtualSelect) {
        pisoAtualSelect.innerHTML = '';
        CONFIG.opcoesPisoAtual.forEach(op => {
            const tempOption = document.createElement('option');
            tempOption.value = op.valor;
            tempOption.innerText = op.texto;
            tempOption.text = op.texto;
            pisoAtualSelect.appendChild(tempOption);
        });
    }

    // 1.4 Popular Select de Modelos de Piso com Categorias
    const modeloSelect = document.getElementById('modelo');
    if (modeloSelect) {
        modeloSelect.innerHTML = '';
        
        // Agrupar por categorias
        const categorias = [...new Set(CONFIG.pisos.map(item => item.categoria))];
        
        categorias.forEach(cat => {
            const optgroup = document.createElement('optgroup');
            optgroup.label = cat;
            
            // Pega pisos da categoria atual
            const pisosDaCategoria = CONFIG.pisos.filter(p => p.categoria === cat);
            pisosDaCategoria.forEach(piso => {
                const tempOption = document.createElement('option');
                const isSobConsulta = piso.sobConsulta || piso.preco === null;
                tempOption.value = JSON.stringify({ 
                    preco: piso.preco, 
                    descricao: piso.descricao, 
                    nome: piso.nome,
                    sobConsulta: isSobConsulta
                });
                
                const labelText = isSobConsulta
                    ? `${piso.nome} — Sob Consulta (Solicitar Cotação)`
                    : `${piso.nome} — R$ ${piso.preco.toFixed(2).replace('.', ',')}/m² (Instalado)`;

                tempOption.innerText = labelText;
                tempOption.text = labelText;
                optgroup.appendChild(tempOption);
            });
            
            modeloSelect.appendChild(optgroup);
        });
    }

    // 1.5 Popular Lista de Bônus no Modal (Design Executivo)
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

// 2. FUNÇÃO DE CALCULAR E ABRIR MODAL
function calcular() {
    const metragemInput = document.getElementById('metragem').value;
    const metragem = parseFloat(metragemInput.replace(',', '.'));
    
    const modeloEl = document.getElementById('modelo');
    if (!modeloEl || !modeloEl.value) {
        alert("Por favor, selecione uma linha de piso.");
        return;
    }

    const modeloData = JSON.parse(modeloEl.value);
    const modeloPreco = modeloData.preco;
    const modeloNome = modeloData.nome;
    const modeloDescricao = modeloData.descricao;

    const pisoAtual = document.getElementById('pisoAtual');
    const pisoAtualNome = (pisoAtual && pisoAtual.options && pisoAtual.selectedIndex >= 0) 
        ? (pisoAtual.options[pisoAtual.selectedIndex].text || pisoAtual.options[pisoAtual.selectedIndex].innerText || '') 
        : '';
    
    const nivelamentoEl = document.getElementById('nivelamento');
    const nivelamentoNome = (nivelamentoEl && nivelamentoEl.options && nivelamentoEl.selectedIndex >= 0) 
        ? (nivelamentoEl.options[nivelamentoEl.selectedIndex].text || nivelamentoEl.options[nivelamentoEl.selectedIndex].innerText || '') 
        : '';

    if (isNaN(metragem) || metragem < 1) {
        alert("Por favor, digite uma metragem válida.");
        return;
    }

    // Lógica de Preço
    const isSobConsulta = modeloData.sobConsulta || modeloData.preco === null || modeloData.preco === undefined;
    const totalLabel = document.querySelector('.total-label');
    const valorFinal = document.getElementById('valorFinal');
    const installmentsText = document.getElementById('installmentsText');
    const linkZap = document.getElementById('linkZap');
    const btnSpan = linkZap ? linkZap.querySelector('span') : null;

    let valorFormatado = "";
    let textoZap = "";
    let total = 0;

    if (isSobConsulta) {
        valorFormatado = "SOB CONSULTA";
        if (totalLabel) totalLabel.innerText = "Condição do Pacote";
        if (valorFinal) {
            valorFinal.innerHTML = `<span style="font-size: 1.85rem; font-weight: 800; letter-spacing: 0.5px; color: var(--primary);">SOB CONSULTA</span>`;
        }
        if (installmentsText) {
            installmentsText.innerHTML = `Até <strong>10x sem juros</strong> ou 10% de desconto à vista`;
        }
        if (btnSpan) {
            btnSpan.innerText = "SOLICITAR VALOR DESSE PACOTE NO WHATSAPP";
        }

        textoZap = `Olá! Fiz uma simulação de orçamento na Deco Pisos e gostaria de solicitar uma proposta especial:\n\n` +
            `📐 *Metragem Estimada:* ${metragem}m²\n` +
            `🪵 *Linha Selecionada:* ${modeloNome}\n` +
            `📋 *Escopo:* ${modeloDescricao}\n` +
            `💰 *Investimento:* Sob Consulta (Solicitação de Proposta Especial)\n\n` +
            `ℹ️ *Local Atual:*\n` +
            `- Piso: ${pisoAtualNome}\n` +
            `- Nivelamento: ${nivelamentoNome}\n\n` +
            `Gostaria de agendar a visita técnica de cortesia e conferir as condições em até 10x sem juros!`;
    } else {
        total = metragem * modeloPreco;
        valorFormatado = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
        if (totalLabel) totalLabel.innerText = "Investimento Total Estimado";
        if (valorFinal) {
            valorFinal.innerText = valorFormatado;
        }
        if (installmentsText) {
            const parcela10 = (total / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            const valorAVista = (total * 0.90).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            installmentsText.innerHTML = `Até <strong>10x de ${parcela10} sem juros</strong> ou <strong>${valorAVista} à vista</strong> (10% OFF)`;
        }
        if (btnSpan) {
            btnSpan.innerText = "CONFIRMAR ORÇAMENTO NO WHATSAPP";
        }

        textoZap = `Olá! Fiz uma simulação de orçamento na Deco Pisos:\n\n` +
            `📐 *Metragem Estimada:* ${metragem}m²\n` +
            `🪵 *Piso Selecionado:* ${modeloNome}\n` +
            `📋 *Escopo:* ${modeloDescricao}\n` +
            `💰 *Investimento Estimado:* ${valorFormatado} (ou 10x sem juros / 10% à vista)\n\n` +
            `ℹ️ *Local Atual:*\n` +
            `- Piso: ${pisoAtualNome}\n` +
            `- Nivelamento: ${nivelamentoNome}\n\n` +
            `Gostaria de confirmar essa condição e agendar a visita técnica de cortesia!`;
    }
    
    // Atualiza o subtítulo do modal com o que está incluso
    const modalSubtitle = document.getElementById('modalSubtitle');
    if (modalSubtitle) {
        modalSubtitle.innerText = modeloDescricao;
    }

    const link = `https://wa.me/${CONFIG.empresa.whatsapp}?text=${encodeURIComponent(textoZap)}`;
    if (linkZap) linkZap.href = link;
    
    // Abre modal
    const modalResult = document.getElementById('modalResult');
    if (modalResult) {
        modalResult.style.display = 'flex';
    }

    // Dispara Evento pro Pixel (função no pixel.js)
    if (typeof trackLead === 'function') {
        trackLead(total);
    }
}

// 3. FECHAR MODAL
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
