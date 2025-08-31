// Executa o nosso código apenas quando todo o HTML foi carregado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ESTADO CENTRAL DO SISTEMA ---
    // Este objeto representa o estado atual do seu microcontrolador.
    // Os controladores (switches) irão alterar estes valores,
    // e os indicadores (ícones) irão ler estes valores para se atualizarem.
    const systemState = {
        sensor1: false, // false = desligado, true = ligado
        sensor2: false,
        motor: false,
    };

    // --- 2. SELEÇÃO DOS ELEMENTOS DO HTML ---
    // Guardamos os elementos que vamos manipular em variáveis para fácil acesso.
    const indicators = {
        sensor1: document.getElementById('indicator-sensor1'),
        sensor2: document.getElementById('indicator-sensor2'),
        motor: document.getElementById('indicator-motor'),
    };

    const controls = {
        sensor1: document.getElementById('control-sensor1'),
        sensor2: document.getElementById('control-sensor2'),
        motor: document.getElementById('control-motor'),
    };

    const emergencyBtn = document.getElementById('emergency-btn');

    // --- 3. FUNÇÃO PARA ATUALIZAR A INTERFACE ---
    // Esta função lê o objeto `systemState` e atualiza a cor dos indicadores
    // e a posição dos switches. É a "fonte da verdade" para a parte visual.
    function updateUI() {
        // Para cada item no nosso estado (sensor1, sensor2, motor)
        for (const key in systemState) {
            const is_on = systemState[key];
            const indicatorElement = indicators[key];
            const controlElement = controls[key];

            if (is_on) {
                // Se estiver LIGADO
                indicatorElement.classList.add('status-on');
                indicatorElement.classList.remove('status-off');
            } else {
                // Se estiver DESLIGADO
                indicatorElement.classList.add('status-off');
                indicatorElement.classList.remove('status-on');
            }
            
            // Garante que o checkbox (switch) sempre reflita o estado real
            controlElement.checked = is_on;
        }
    }
    
    // --- 4. CONFIGURAÇÃO DOS EVENTOS ---

    // Adiciona um "ouvinte" para cada switch. Quando um switch for alterado...
    for (const key in controls) {
        controls[key].addEventListener('change', (event) => {
            // 1. Atualiza o nosso objeto de estado com o novo valor (true/false)
            systemState[key] = event.target.checked;
            
            // 2. Imprime no console para depuração (pressione F12 no navegador para ver)
            console.log(`Estado do ${key} alterado para:`, systemState[key]);

            // 3. Chama a função para atualizar a interface visual
            updateUI();
        });
    }

    // Adiciona um evento de clique para o botão de emergência
    emergencyBtn.addEventListener('click', () => {
        // Aqui, no futuro, você enviaria o comando para o seu microcontrolador via API/WebSocket
        console.error('SINAL DE EMERGÊNCIA ENVIADO!');
        alert('Sinal de emergência enviado para o servidor!');
    });


    // --- 5. INICIALIZAÇÃO ---
    // Chama a função updateUI() uma vez no início para garantir que a tela
    // comece com as cores e posições corretas, de acordo com o estado inicial.
    updateUI();
});