// Estado da aplicação
const state = {
    apiUrl: 'http://localhost:8000',
    currentResult: null,
    isLoading: false
};

// Exemplo de história de usuário
const exampleStory = `# História: Pagamento Automático de Contas

## Descrição
Como usuário do sistema bancário
Quero configurar pagamentos automáticos de contas
Para não precisar pagar manualmente todos os meses

## Critérios de Aceitação
- O sistema deve permitir cadastrar contas para pagamento automático
- O usuário deve poder definir a data de pagamento
- O sistema deve enviar notificação antes do pagamento
- O usuário deve poder cancelar o pagamento automático a qualquer momento
- O sistema deve validar saldo disponível antes de agendar

## Regras de Negócio
- Pagamentos só podem ser agendados com saldo suficiente
- Notificação deve ser enviada 2 dias antes do pagamento
- Limite máximo de 10 contas em pagamento automático
- Pagamentos devem ser processados até às 18h do dia agendado
- Em caso de feriado, o pagamento é processado no dia útil anterior

## Integrações
- Sistema de notificações por email e SMS
- Gateway de pagamento bancário
- Sistema de validação de saldo em tempo real`;

// Elementos do DOM
const elements = {
    storyInput: document.getElementById('storyInput'),
    apiUrl: document.getElementById('apiUrl'),
    calculateBtn: document.getElementById('calculateBtn'),
    loadExampleBtn: document.getElementById('loadExampleBtn'),
    clearBtn: document.getElementById('clearBtn'),
    loadingSection: document.getElementById('loadingSection'),
    resultsSection: document.getElementById('resultsSection'),
    errorSection: document.getElementById('errorSection'),
    errorMessage: document.getElementById('errorMessage'),
    retryBtn: document.getElementById('retryBtn'),
    bcpTotal: document.getElementById('bcpTotal'),
    businessRules: document.getElementById('businessRules'),
    uiElements: document.getElementById('uiElements'),
    externalIntegrations: document.getElementById('externalIntegrations'),
    maturityScore: document.getElementById('maturityScore'),
    maturityClassification: document.getElementById('maturityClassification'),
    maturityAssessment: document.getElementById('maturityAssessment'),
    investScore: document.getElementById('investScore'),
    investClassification: document.getElementById('investClassification'),
    investAssessment: document.getElementById('investAssessment'),
    jsonDetails: document.getElementById('jsonDetails'),
    toggleDetailsBtn: document.getElementById('toggleDetailsBtn'),
    exportJsonBtn: document.getElementById('exportJsonBtn'),
    newAnalysisBtn: document.getElementById('newAnalysisBtn'),
    helpLink: document.getElementById('helpLink'),
    helpModal: document.getElementById('helpModal'),
    closeModal: document.querySelector('.close')
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    loadSavedApiUrl();
});

// Event Listeners
function initializeEventListeners() {
    elements.calculateBtn.addEventListener('click', handleCalculate);
    elements.loadExampleBtn.addEventListener('click', loadExample);
    elements.clearBtn.addEventListener('click', clearForm);
    elements.retryBtn.addEventListener('click', handleCalculate);
    elements.toggleDetailsBtn.addEventListener('click', toggleDetails);
    elements.exportJsonBtn.addEventListener('click', exportJson);
    elements.newAnalysisBtn.addEventListener('click', resetToInput);
    elements.helpLink.addEventListener('click', showHelp);
    elements.closeModal.addEventListener('click', hideHelp);
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === elements.helpModal) {
            hideHelp();
        }
    });

    // Salvar URL da API quando mudar
    elements.apiUrl.addEventListener('change', saveApiUrl);
}

// Carregar URL da API salva
function loadSavedApiUrl() {
    const savedUrl = localStorage.getItem('bcpApiUrl');
    if (savedUrl) {
        elements.apiUrl.value = savedUrl;
        state.apiUrl = savedUrl;
    }
}

// Salvar URL da API
function saveApiUrl() {
    const url = elements.apiUrl.value.trim();
    state.apiUrl = url;
    localStorage.setItem('bcpApiUrl', url);
}

// Carregar exemplo
function loadExample() {
    elements.storyInput.value = exampleStory;
}

// Limpar formulário
function clearForm() {
    elements.storyInput.value = '';
}

// Resetar para input
function resetToInput() {
    hideSection(elements.resultsSection);
    hideSection(elements.errorSection);
    elements.storyInput.value = '';
    elements.storyInput.focus();
}

// Calcular BCP
async function handleCalculate() {
    const storyContent = elements.storyInput.value.trim();
    
    if (!storyContent) {
        showError('Por favor, insira uma história de usuário.');
        return;
    }

    saveApiUrl();
    
    try {
        showLoading();
        const result = await calculateBCP(storyContent);
        state.currentResult = result;
        displayResults(result);
    } catch (error) {
        showError(error.message);
    }
}

// Chamar API para calcular BCP
async function calculateBCP(storyContent) {
    const url = `${state.apiUrl}/calculate`;
    
    try {
        // Iniciar o job
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: storyContent,
                provider: 'claude'
            })
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('API não encontrada. Certifique-se de que o servidor está rodando em: ' + state.apiUrl);
            }
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || `Erro na API: ${response.status}`);
        }

        const jobData = await response.json();
        const jobId = jobData.job_id;
        
        // Polling para verificar o status do job
        return await pollJobStatus(jobId);
        
    } catch (error) {
        if (error.message.includes('Failed to fetch')) {
            throw new Error('Não foi possível conectar à API. Verifique se o servidor está rodando:\n\npython3 run_api_server.py');
        }
        throw error;
    }
}

// Polling para verificar status do job
async function pollJobStatus(jobId, maxAttempts = 60, interval = 2000) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await fetch(`${state.apiUrl}/status/${jobId}`);
            
            if (!response.ok) {
                throw new Error(`Erro ao verificar status: ${response.status}`);
            }
            
            const status = await response.json();
            
            if (status.status === 'completed') {
                return status.result;
            } else if (status.status === 'failed') {
                throw new Error(status.error || 'Erro ao processar a história');
            }
            
            // Aguardar antes de tentar novamente
            await new Promise(resolve => setTimeout(resolve, interval));
            
        } catch (error) {
            if (attempt === maxAttempts - 1) {
                throw error;
            }
        }
    }
    
    throw new Error('Timeout: A análise está demorando muito. Tente novamente.');
}

// Mostrar loading
function showLoading() {
    state.isLoading = true;
    elements.calculateBtn.disabled = true;
    hideSection(elements.resultsSection);
    hideSection(elements.errorSection);
    showSection(elements.loadingSection);
}

// Mostrar resultados
function displayResults(result) {
    state.isLoading = false;
    elements.calculateBtn.disabled = false;
    hideSection(elements.loadingSection);
    hideSection(elements.errorSection);
    
    // BCP Total
    elements.bcpTotal.textContent = result.total_bcp || 0;
    
    // Componentes
    const components = result.components || {};
    elements.businessRules.textContent = components['Business Rules'] || 0;
    elements.uiElements.textContent = components['UI Elements'] || 0;
    elements.externalIntegrations.textContent = components['External Integrations'] || 0;
    
    // Maturidade
    const maturity = result.steps?.['Story Maturity Complexity'] || {};
    elements.maturityScore.textContent = maturity.score || 0;
    elements.maturityClassification.textContent = maturity.classification || '-';
    elements.maturityAssessment.textContent = maturity.assessment || '-';
    
    // INVEST
    const invest = result.steps?.['Story INVEST Maturity'] || {};
    elements.investScore.textContent = invest.score || 0;
    elements.investClassification.textContent = invest.classification || '-';
    elements.investAssessment.textContent = invest.assessment || '-';
    
    // JSON completo
    elements.jsonDetails.textContent = JSON.stringify(result, null, 2);
    
    showSection(elements.resultsSection);
    
    // Scroll suave para resultados
    elements.resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Mostrar erro
function showError(message) {
    state.isLoading = false;
    elements.calculateBtn.disabled = false;
    hideSection(elements.loadingSection);
    hideSection(elements.resultsSection);
    
    elements.errorMessage.textContent = message;
    showSection(elements.errorSection);
    
    // Scroll suave para erro
    elements.errorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Toggle detalhes JSON
function toggleDetails() {
    const isVisible = elements.jsonDetails.style.display !== 'none';
    
    if (isVisible) {
        elements.jsonDetails.style.display = 'none';
        elements.toggleDetailsBtn.innerHTML = '<span class="btn-icon">👁️</span> Mostrar JSON Completo';
    } else {
        elements.jsonDetails.style.display = 'block';
        elements.toggleDetailsBtn.innerHTML = '<span class="btn-icon">🙈</span> Ocultar JSON';
    }
}

// Exportar JSON
function exportJson() {
    if (!state.currentResult) return;
    
    const dataStr = JSON.stringify(state.currentResult, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `bcp-result-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Mostrar ajuda
function showHelp(e) {
    e.preventDefault();
    elements.helpModal.style.display = 'flex';
}

// Esconder ajuda
function hideHelp() {
    elements.helpModal.style.display = 'none';
}

// Utilitários
function showSection(element) {
    element.style.display = 'block';
}

function hideSection(element) {
    element.style.display = 'none';
}

// Verificar status da API ao carregar
async function checkApiStatus() {
    try {
        const response = await fetch(`${state.apiUrl}/health`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('✅ API está online e funcionando');
            return true;
        }
    } catch (error) {
        console.warn('⚠️ API não está acessível. Certifique-se de iniciar o servidor:\npython3 run_api_server.py');
        return false;
    }
}

// Verificar API ao carregar a página
checkApiStatus();

// Made with Bob
