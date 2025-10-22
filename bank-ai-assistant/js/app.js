/**
 * Aplicación principal - BankIA Assistant
 * Gestiona la navegación, chat y flujo de la aplicación
 */

// Estado de la aplicación
const appState = {
    currentScreen: 'home-screen',
    conversationHistory: [],
    currentRecommendations: [],
    conversationStage: 'initial'
};

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏦 BankIA Assistant iniciado');

    // Event listener para el input del chat
    const chatInput = document.getElementById('chat-input');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Cerrar modales al hacer click fuera
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });
});

/**
 * Gestión de pantallas
 */
function showScreen(screenId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Mostrar la pantalla solicitada
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        appState.currentScreen = screenId;

        // Scroll al top
        window.scrollTo(0, 0);
    }
}

/**
 * Navegar a la pantalla de inicio
 */
function goHome() {
    showScreen('home-screen');
    appState.conversationStage = 'initial';
}

/**
 * Iniciar chat
 */
function startChat() {
    showScreen('chat-screen');

    // Si no hay mensajes, agregar mensaje de bienvenida
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages.querySelector('.message')) {
        setTimeout(() => {
            addMessage('bot', `¡Hola ${clientProfile.name}! 👋\n\nSoy tu asistente financiero inteligente. Estoy aquí para ayudarte a encontrar los productos perfectos para ti.\n\nContame, ¿qué necesitás o qué te gustaría hacer con tus finanzas?`);
            // updateQuickSuggestions('initial');
        }, 500);
    }

    // Focus en el input
    setTimeout(() => {
        document.getElementById('chat-input')?.focus();
    }, 600);
}

/**
 * Volver al chat desde productos
 */
function backToChat() {
    showScreen('chat-screen');
    scrollToBottom();
}

/**
 * Volver a productos desde contratación
 */
function backToProducts() {
    if (appState.currentRecommendations.length > 0) {
        const reason = generateRecommendationSummary(appState.currentRecommendations);
        renderProductsList(appState.currentRecommendations, reason);
    } else {
        showScreen('chat-screen');
    }
}

/**
 * Agregar mensaje al chat
 */
function addMessage(sender, text, options = {}) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const time = new Date().toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const avatar = sender === 'bot' ? '🤖' : '👤';

    // Convertir texto con formato markdown básico
    const formattedText = formatMessageText(text);

    messageDiv.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">
            <div class="message-bubble">${formattedText}</div>
            ${!options.hideTime ? `<div class="message-time">${time}</div>` : ''}
        </div>
    `;

    chatMessages.appendChild(messageDiv);

    // Guardar en historial
    appState.conversationHistory.push({
        sender,
        text,
        timestamp: new Date()
    });

    // Scroll al final
    scrollToBottom();
}

/**
 * Formatea el texto del mensaje (markdown básico)
 */
function formatMessageText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

/**
 * Enviar mensaje del usuario
 */
async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();

    if (!message) return;

    // Agregar mensaje del usuario
    addMessage('user', message);

    // Limpiar input
    input.value = '';

    // Deshabilitar input mientras se procesa
    input.disabled = true;
    document.getElementById('send-btn').disabled = true;

    // Mostrar indicador de escritura
    showTypingIndicator();

    // Simular procesamiento de IA
    await simulateAIProcessing();

    // Analizar intención del mensaje
    const intents = analyzeIntent(message);
    console.log('Intenciones detectadas:', intents);

    // Generar recomendaciones
    const recommendations = getRecommendations(intents);
    console.log('Recomendaciones:', recommendations);

    // Guardar recomendaciones actuales
    appState.currentRecommendations = recommendations;

    // Generar respuesta del bot
    const botResponse = generateBotResponse(message, intents, recommendations);

    // Ocultar indicador de escritura
    hideTypingIndicator();

    // Agregar respuesta del bot
    addMessage('bot', botResponse);

    // Si hay recomendaciones, mostrarlas como tarjetas
    if (recommendations.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
        displayRecommendationCards(recommendations);

        // Actualizar stage de conversación
        appState.conversationStage = 'afterRecommendation';
        // updateQuickSuggestions('afterRecommendation');
    }

    // Rehabilitar input
    input.disabled = false;
    document.getElementById('send-btn').disabled = false;
    input.focus();
}

/**
 * Muestra tarjetas de recomendación en el chat
 */
function displayRecommendationCards(recommendations) {
    const chatMessages = document.getElementById('chat-messages');

    recommendations.forEach((product, index) => {
        setTimeout(() => {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'message bot';
            cardDiv.innerHTML = `
                <div class="message-avatar">🤖</div>
                <div class="message-content">
                    ${renderProductCard(product)}
                </div>
            `;
            chatMessages.appendChild(cardDiv);
            scrollToBottom();
        }, index * 300);
    });

    // Agregar botón para ver todos
    setTimeout(() => {
        const viewAllDiv = document.createElement('div');
        viewAllDiv.className = 'message bot';
        viewAllDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="message-bubble">
                    ¿Te gustaría ver todos los detalles de estas recomendaciones?
                    <div style="margin-top: var(--spacing-md);">
                        <button class="btn btn-primary btn-small" onclick="showAllRecommendations()">
                            Ver todos los productos
                        </button>
                    </div>
                </div>
            </div>
        `;
        chatMessages.appendChild(viewAllDiv);
        scrollToBottom();
    }, recommendations.length * 300 + 500);
}

/**
 * Muestra todas las recomendaciones en pantalla completa
 */
function showAllRecommendations() {
    if (appState.currentRecommendations.length === 0) return;

    const reason = generateRecommendationSummary(appState.currentRecommendations);
    renderProductsList(appState.currentRecommendations, reason);
}

/**
 * Genera resumen de por qué se recomiendan los productos
 */
function generateRecommendationSummary(recommendations) {
    const hasBank = recommendations.some(p => p.category === 'bank');
    const hasPartner = recommendations.some(p => p.category === 'partner');

    let summary = `Basándome en tu perfil financiero, tus ingresos mensuales de $${clientProfile.monthlyIncome.toLocaleString()} y tus hábitos de consumo, `;

    if (hasBank && hasPartner) {
        summary += `seleccioné una combinación de productos del banco y de aliados estratégicos `;
    } else if (hasBank) {
        summary += `seleccioné productos del banco `;
    } else {
        summary += `seleccioné productos de nuestros aliados `;
    }

    summary += `que se adaptan perfectamente a tus necesidades actuales y te ayudarán a optimizar tus finanzas.`;

    return summary;
}

/**
 * Muestra indicador de escritura
 */
function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'message bot';
    typingDiv.innerHTML = `
        <div class="message-avatar">🤖</div>
        <div class="message-content">
            <div class="message-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

/**
 * Oculta indicador de escritura
 */
function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Scroll al final del chat
 */
function scrollToBottom() {
    const chatMessages = document.getElementById('chat-messages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

/**
 * Actualiza las sugerencias rápidas
 */
function updateQuickSuggestions(stage) {
    const suggestionsContainer = document.getElementById('quick-suggestions');
    if (!suggestionsContainer) return;

    const suggestions = getQuickSuggestions(stage);

    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-chip" onclick="useSuggestion('${suggestion}')">
            ${suggestion}
        </div>
    `).join('');
}

/**
 * Usa una sugerencia rápida
 */
function useSuggestion(suggestion) {
    const input = document.getElementById('chat-input');
    if (input) {
        input.value = suggestion;
        sendMessage();
    }
}

/**
 * Toggle del modal de perfil
 */
function toggleProfile() {
    const modal = document.getElementById('profile-modal');
    const profileContent = document.getElementById('profile-content');

    if (!modal.classList.contains('active')) {
        // Renderizar contenido del perfil
        profileContent.innerHTML = renderProfileContent();
        modal.classList.add('active');
    } else {
        modal.classList.remove('active');
    }
}

/**
 * Renderiza el contenido del perfil
 */
function renderProfileContent() {
    return `
        <div class="profile-section">
            <h4>Información Personal</h4>
            <div class="profile-field">
                <span class="profile-label">Nombre</span>
                <span class="profile-value">${clientProfile.name}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Edad</span>
                <span class="profile-value">${clientProfile.age} años</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Ocupación</span>
                <span class="profile-value">${clientProfile.occupation}</span>
            </div>
        </div>

        <div class="profile-section">
            <h4>Información Financiera</h4>
            <div class="profile-field">
                <span class="profile-label">Ingresos mensuales</span>
                <span class="profile-value">$${clientProfile.monthlyIncome.toLocaleString()}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Score crediticio</span>
                <span class="profile-value">${clientProfile.creditScore}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Perfil</span>
                <span class="profile-value">${clientProfile.financialProfile.replace('_', ' ')}</span>
            </div>
        </div>

        <div class="profile-section">
            <h4>Hábitos de Consumo</h4>
            <div class="profile-field">
                <span class="profile-label">Transporte</span>
                <span class="profile-value">${formatHabit(clientProfile.spendingHabits.transport)}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Entretenimiento</span>
                <span class="profile-value">${formatHabit(clientProfile.spendingHabits.entertainment)}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Compras</span>
                <span class="profile-value">${formatHabit(clientProfile.spendingHabits.shopping)}</span>
            </div>
            <div class="profile-field">
                <span class="profile-label">Viajes</span>
                <span class="profile-value">${formatHabit(clientProfile.spendingHabits.travel)}</span>
            </div>
        </div>

        <div class="profile-section">
            <h4>Productos Contratados</h4>
            ${clientProfile.currentProducts.map(product => `
                <div class="profile-field">
                    <span class="profile-value" style="flex: 1;">✓ ${product}</span>
                </div>
            `).join('')}
        </div>

        <div class="profile-section">
            <h4>Objetivo Financiero</h4>
            <div class="profile-field">
                <span class="profile-value" style="flex: 1;">
                    ${clientProfile.savingsGoal.charAt(0).toUpperCase() + clientProfile.savingsGoal.slice(1)}
                </span>
            </div>
        </div>

        <div style="margin-top: var(--spacing-xl); padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-md);">
            <p style="font-size: 0.75rem; color: var(--text-secondary); text-align: center;">
                💡 Este perfil es utilizado por nuestra IA para personalizar las recomendaciones de productos
            </p>
        </div>
    `;
}

/**
 * Formatea el nivel de hábito
 */
function formatHabit(level) {
    const badges = {
        'alto': '<span style="color: var(--error); font-weight: 600;">Alto</span>',
        'medio': '<span style="color: var(--warning); font-weight: 600;">Medio</span>',
        'bajo': '<span style="color: var(--success); font-weight: 600;">Bajo</span>'
    };
    return badges[level] || level;
}

/**
 * Manejo de errores global
 */
window.addEventListener('error', (event) => {
    console.error('Error en la aplicación:', event.error);
});

/**
 * Log de estado para debugging
 */
function logAppState() {
    console.log('Estado de la aplicación:', appState);
    console.log('Perfil del cliente:', clientProfile);
}

// Exponer funciones globales necesarias
window.startChat = startChat;
window.goHome = goHome;
window.backToChat = backToChat;
window.backToProducts = backToProducts;
window.sendMessage = sendMessage;
window.useSuggestion = useSuggestion;
window.toggleProfile = toggleProfile;
window.showAllRecommendations = showAllRecommendations;
window.viewProductDetails = viewProductDetails;
window.startContract = startContract;
window.validateContractForm = validateContractForm;
window.confirmContract = confirmContract;
window.closeSuccessModal = closeSuccessModal;
window.addToChat = addToChat;
window.logAppState = logAppState;
