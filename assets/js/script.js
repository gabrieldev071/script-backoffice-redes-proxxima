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
    const quantidadePortasCtoSelect = document.getElementById('quantidadePortasCtoSelect');
    const verificarCtoRadio = document.getElementById('verificarCto');
    const appAside = document.querySelector('.app-aside');
    const vlanInput = document.getElementById('vlan');

    // === 2. Funções Auxiliares ===

    function getTipoServico() {
        const tipoServicoRadios = document.querySelectorAll('input[name="tipoServico"]');
        for (const radio of tipoServicoRadios) {
            if (radio.checked) {
                if (radio.id === 'outro') {
                    return outroTipoServicoInput.value;
                }
                return radio.value;
            }
        }
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

        if (verificarCtoRadio.checked) {
            quantidadePortasCto = quantidadePortasCtoSelect.value;
            tipoServico += ` (Portas: ${quantidadePortasCto || 'Não informado'})`;
        }

        let textoResumo = `*INFORMAÇÕES DO CLIENTE:*

Protocolo: ${protocolo || 'Não informado'}
PPPoE: ${pppoe || 'Não informado'}

*INFORMAÇÕES DO EQUIPAMENTO:*

Serial ONU: ${serialOnu || 'Não informado'}
Modo OP: ${tipoEquipamento || 'Não informado'}
Marca ONU: ${marcaONU || 'Não informado'}
VLAN: ${vlan || 'Não informado'}
OLT: ${olt || 'Não informado'}

*TIPO DE ATENDIMENTO:* ${tipoServico || 'Não informado'}

*DESCRIÇÃO DO SERVIÇO:* ${descricaoServico || 'Não informado'}

*INFORMAÇÕES EXTRAS:*

Tentou pelo ANIEL: ${tentouPeloAniel || 'Não informado'}`;

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