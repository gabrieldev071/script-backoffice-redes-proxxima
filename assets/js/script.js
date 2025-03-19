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
        for (const radio of tipoServicoRadios) {
            if (radio.checked) {
                tipoServico = radio.value;
            //    console.log('Tipo de Serviço:', tipoServico);
                if (radio.id === 'outro') {
                    return outroTipoServicoInput.value;
                }
                return radio.value;
            }
        }
        return tipoServico;
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

        if (verificarCtoRadio.checked && tipoServico === 'Verificar CTO' && quantidadePortasCtoSelect) { // Verifica se o radio está marcado e se o elemento existe
             quantidadePortasCto = quantidadePortasCtoSelect.value;
            tipoServico += ` (Portas: ${quantidadePortasCto || 'Não informado'})`;
        }

        let textoResumo = `
    *INFORMAÇÕES DO CLIENTE:*

    Protocolo: ${protocolo || ''}
    PPPoE: ${pppoe || ''}

    *INFORMAÇÕES DO EQUIPAMENTO:*

    Serial ONU: ${serialOnu || ''}
    Modo OP: ${tipoEquipamento || ''}
    Marca ONU: ${marcaONU || ''}
    VLAN: ${vlan || ''}
    Ponto de Acesso: ${olt || ''}

    *TIPO DE ATENDIMENTO:* ${tipoServico || ''}

    *DESCRIÇÃO DETALHADA:* ${descricaoServico || ''}

    *TENTOU PELO ANIEL*: ${tentouPeloAniel || ''}
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
     //   console.log('Função atualizarVisibilidadeQuantidadeCto() chamada'); // Para Debug
        if (quantidadePortasCtoContainer) { // Verifica se o container existe
            quantidadePortasCtoContainer.style.display = verificarCtoRadio.checked ? 'block' : 'none';
            if (!verificarCtoRadio.checked && quantidadePortasCtoSelect) { // Verifica se o select existe antes de limpar
                quantidadePortasCtoSelect.value = '';
            }
        }
    }

    botaoGerarCopiar.addEventListener('click', function () {
      //  console.log('Botão Gerar Resumo e Copiar clicado'); // Para Debug
        const textoResumoGerado = gerarTextoResumo();
      //  console.log('Resumo gerado:', textoResumoGerado); // Para Debug
        resumoTexto.textContent = textoResumoGerado;
        copiarParaAreaTransferencia(textoResumoGerado);
        appAside.style.display = 'block';
    });

    outroTipoServicoRadio.addEventListener('change', atualizarEstadoCampoOutro);
    verificarCtoRadio.addEventListener('change', atualizarVisibilidadeQuantidadeCto);

    atualizarEstadoCampoOutro();
    atualizarVisibilidadeQuantidadeCto();
});