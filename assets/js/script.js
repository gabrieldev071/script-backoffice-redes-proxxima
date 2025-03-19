document.addEventListener('DOMContentLoaded', function () {
    // === 1. Elementos do DOM ===
    const botaoGerarCopiar = document.getElementById('gerarCopiarResumo');
    const resumoTexto = document.getElementById('resumoTexto');
    const outroTipoServicoRadio = document.getElementById('outro');
    const outroTipoServicoInput = document.getElementById('outroTipoServico');
    const tipoEquipamentoSelect = document.getElementById('tipoEquipamento');
    const marcaONUSelect = document.getElementById('marcaONU');
    const tentouPeloAnielSelect = document.getElementById('tentouPeloAniel');
    const quantidadePortasCtoContainer = document.getElementById('quantidadePortasCtoContainer');
    const quantidadePortasCtoSelect = document.getElementById('quantidadePortasCto');
    const verificarCtoRadio = document.getElementById('verificarCto');
    const appAside = document.querySelector('.app-aside');
    const vlanInput = document.getElementById('vlan');

    // === 2. Funções Auxiliares ===

    function getTipoServico() {
        // Obtém a lista de radio buttons para o tipo de serviço
        const tipoServicoRadios = document.querySelectorAll('input[name="tipoServico"]');

        // Percorre os radio buttons
        for (const radio of tipoServicoRadios) {
            // Se o radio estiver marcado
            if (radio.checked) {
                // Se for o radio "Outro", retorna o valor do input de texto
                if (radio.id === 'outro') {
                    return outroTipoServicoInput.value;
                }
                // Caso contrário, retorna o valor do radio
                return radio.value;
            }
        }
        // Se nenhum estiver marcado, retorna vazio
        return '';
    }

    function gerarTextoResumo() {
        const protocolo = document.getElementById('protocolo').value;
        const pppoe = document.getElementById('pppoe').value;
        const serialOnu = document.getElementById('serialOnu').value;
        const tipoEquipamento = tipoEquipamentoSelect.value;
        const marcaONU = marcaONUSelect.value;
        const vlan = vlanInput.value;
        const olt = document.getElementById('olt').value;
        let tipoServico = getTipoServico();
        const descricaoServico = document.getElementById('descricaoServico').value;
        const tentouPeloAniel = tentouPeloAnielSelect.value;
        let quantidadePortasCto = '';
         if (verificarCtoRadio.checked) { // Verifica se o radio está marcado
            quantidadePortasCto = quantidadePortasCtoSelect.value;
            tipoServico += ` (Portas: ${quantidadePortasCto || 'Não informado'})`;
        }


        let textoResumo = `
    *INFORMAÇÕES DO CLIENTE:*

    Protocolo: ${protocolo || 'Não informado'}
    PPPoE: ${pppoe || 'Não informado'}

    *INFORMAÇÃO DO EQUIPAMENTO:*

    Serial ONU: ${serialOnu || 'Não informado'}
    Modo OP: ${tipoEquipamento || 'Não informado'}
    Marca ONU: ${marcaONU || 'Não informado'}
    VLAN: ${vlan || 'Não informado'}
    OLT: ${olt || 'Não informado'}

    *TIPO DE ATENDIMENTO:* ${tipoServico || 'Não informado'}

    *DESCRIÇÃO DETALHADA:* ${descricaoServico || 'Não informado'}

    Tentou pelo ANIEL: ${tentouPeloAniel || 'Não informado'}
    `;

        return textoResumo;
    }

    function copiarParaAreaTransferencia(texto) {
        navigator.clipboard.writeText(texto)
            .then(() => {
                alert("Resumo copiado para a área de transferência!");
            })
            .catch(erro => {
                console.error("Falha ao copiar o texto:", erro);
                alert("Falha ao copiar o resumo. Por favor, tente novamente.");
            });
    }

    function atualizarEstadoCampoOutro() {
        outroTipoServicoInput.disabled = !outroTipoServicoRadio.checked;

        if (!outroTipoServicoRadio.checked) {
            outroTipoServicoInput.value = '';
        }
    }

    function atualizarVisibilidadeQuantidadeCto() {
        if (verificarCtoRadio.checked) {
            quantidadePortasCtoContainer.style.display = 'block';
        } else {
            quantidadePortasCtoContainer.style.display = 'none';
            quantidadePortasCtoSelect.value = '';
        }
    }

    botaoGerarCopiar.addEventListener('click', function () {
        const textoResumoGerado = gerarTextoResumo();
        resumoTexto.textContent = textoResumoGerado;
        copiarParaAreaTransferencia(textoResumoGerado);
        appAside.style.display = 'block';
    });

    outroTipoServicoRadio.addEventListener('change', atualizarEstadoCampoOutro);
    verificarCtoRadio.addEventListener('change', atualizarVisibilidadeQuantidadeCto);

    atualizarEstadoCampoOutro();
    atualizarVisibilidadeQuantidadeCto();
});