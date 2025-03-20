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
        const tipoServicoRadios = document.querySelectorAll('input[name="tipoServico"]');
        let tipoServico = '';

        tipoServicoRadios.forEach(radio => {
            if (radio.checked) {
                tipoServico = radio.value;
                if (radio.id === 'outro') {
                    tipoServico = outroTipoServicoInput.value.trim() || 'Não especificado';
                }
            }
        });

        return tipoServico;
    }

    function gerarTextoResumo() {
        const protocolo = document.getElementById('protocolo').value.trim();
        const pppoe = document.getElementById('pppoe').value.trim();
        const serialOnu = document.getElementById('serialOnu').value.trim();
        const tipoEquipamento = tipoEquipamentoSelect.value.trim();
        const marcaONU = marcaONUSelect.value.trim();
        const vlan = vlanInput.value.trim();
        const olt = document.getElementById('olt').value.trim();
        let tipoServico = getTipoServico();
        const descricaoServico = document.getElementById('descricaoServico').value.trim();
        const tentouPeloAniel = tentouPeloAnielSelect.value.trim();
        let quantidadePortasCto = '';

        if (verificarCtoRadio.checked && tipoServico === 'Verificar CTO') {
            quantidadePortasCto = quantidadePortasCtoSelect.value.trim();
            tipoServico += ` (Portas: ${quantidadePortasCto || 'Não informado'})`;
        }

        return `
*INFORMAÇÕES DO CLIENTE:*

Protocolo: ${protocolo || ''}
PPPoE: ${pppoe || ''}

*INFORMAÇÕES DO EQUIPAMENTO:*

Serial ONU: ${serialOnu || ''}
Modo OP: ${tipoEquipamento || ''}
Marca ONU: ${marcaONU || ''}
VLAN: ${vlan || ''}
Ponto de Acesso: ${olt || ''}

*TIPO DE ATENDIMENTO:* ${tipoServico}

*DESCRIÇÃO DETALHADA:* ${descricaoServico || ''}

*TENTOU PELO ANIEL:* ${tentouPeloAniel || ''}
`;
    }

    function copiarParaAreaTransferencia(texto) {
        navigator.clipboard.writeText(texto)
            .then(() => alert("Resumo copiado para a área de transferência!"))
            .catch(() => alert("Falha ao copiar o resumo. Por favor, tente novamente."));
    }

    function atualizarEstadoCampoOutro() {
        outroTipoServicoInput.disabled = !outroTipoServicoRadio.checked;
        if (!outroTipoServicoRadio.checked) {
            outroTipoServicoInput.value = '';
        }
    }

    function atualizarVisibilidadeQuantidadeCto() {
        quantidadePortasCtoContainer.style.display = verificarCtoRadio.checked ? 'block' : 'none';
        if (!verificarCtoRadio.checked) {
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

    // Inicia os estados corretos dos campos
    atualizarEstadoCampoOutro();
    atualizarVisibilidadeQuantidadeCto();
});
