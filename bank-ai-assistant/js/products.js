/**
 * Gestión de productos y visualización
 */

/**
 * Renderiza una tarjeta de producto en el chat
 */
function renderProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-card-header">
                <div class="product-icon ${product.category === 'partner' ? 'partner' : ''}">
                    ${product.icon}
                </div>
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <span class="product-type ${product.category === 'partner' ? 'partner' : ''}">
                        ${product.category === 'partner' ? '🤝 ' + product.partner : '🏦 ' + product.type}
                    </span>
                </div>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: var(--spacing-md); font-size: 0.875rem;">
                ${product.description}
            </p>
            <ul class="product-benefits">
                ${product.benefits.slice(0, 3).map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <div class="product-actions">
                <button class="btn btn-primary btn-small" onclick="viewProductDetails('${product.id}')">
                    Ver detalles
                </button>
                <button class="btn btn-outline btn-small" onclick="startContract('${product.id}')">
                    Contratar ahora
                </button>
            </div>
        </div>
    `;
}

/**
 * Renderiza la lista completa de productos recomendados
 */
function renderProductsList(products, reason) {
    const productsScreen = document.getElementById('products-screen');
    const reasonContainer = document.getElementById('recommendation-reason');
    const productsList = document.getElementById('products-list');

    // Renderizar razón de recomendación
    reasonContainer.innerHTML = `
        <h3>💡 ¿Por qué estos productos?</h3>
        <p>${reason}</p>
    `;

    // Renderizar productos
    productsList.innerHTML = products.map(product => `
        <div class="product-item">
            <div class="product-item-header">
                <div class="product-item-icon ${product.category === 'partner' ? 'partner' : ''}">
                    ${product.icon}
                </div>
                <div class="product-item-info">
                    <h3>${product.name}</h3>
                    <span class="product-badge ${product.category === 'partner' ? 'partner' : ''}">
                        ${product.category === 'partner' ? '🤝 Aliado: ' + product.partner : '🏦 ' + product.type}
                    </span>
                </div>
            </div>
            <p class="product-item-description">${product.description}</p>
            <ul class="product-item-benefits">
                ${product.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>
            <div class="product-item-footer">
                <button class="btn btn-primary" onclick="startContract('${product.id}')">
                    Contratar ahora
                </button>
                <button class="btn btn-secondary" onclick="addToChat('Cuéntame más sobre ${product.name}')">
                    Más información
                </button>
            </div>
        </div>
    `).join('');

    // Mostrar pantalla
    showScreen('products-screen');
}

/**
 * Muestra detalles de un producto en el chat
 */
function viewProductDetails(productId) {
    const allProducts = [...bankProducts, ...partnerProducts];
    const product = allProducts.find(p => p.id === productId);

    if (product) {
        // Volver al chat
        showScreen('chat-screen');

        // Agregar mensaje del usuario
        addMessage('user', `Cuéntame más sobre ${product.name}`);

        // Simular respuesta del bot
        setTimeout(() => {
            const detailMessage = generateProductDetailMessage(product);
            addMessage('bot', detailMessage);
        }, 1000);
    }
}

/**
 * Genera mensaje detallado sobre un producto
 */
function generateProductDetailMessage(product) {
    const reason = getRecommendationReason(product, []);

    return `
¡Excelente elección! Te cuento más sobre **${product.name}**:

${product.description}

**${reason}**

**Beneficios completos:**
${product.benefits.map((b, i) => `${i + 1}. ${b}`).join('\n')}

${product.category === 'partner' ?
    `\n💡 Este es un producto de nuestro aliado **${product.partner}**, con beneficios exclusivos para clientes del banco.` :
    '\n💡 Este es un producto oficial del banco con las mejores condiciones del mercado.'}

¿Te gustaría contratarlo ahora? La activación es inmediata.
    `.trim();
}

/**
 * Inicia el flujo de contratación de un producto
 */
function startContract(productId) {
    const allProducts = [...bankProducts, ...partnerProducts];
    const product = allProducts.find(p => p.id === productId);

    if (!product) return;

    // Guardar producto seleccionado
    window.selectedProduct = product;

    // Renderizar pantalla de contratación
    renderContractScreen(product);
}

/**
 * Renderiza la pantalla de contratación
 */
function renderContractScreen(product) {
    const contractContent = document.getElementById('contract-content');

    contractContent.innerHTML = `
        <div class="contract-product">
            <div class="contract-product-header">
                <div class="contract-product-icon" style="background: ${product.category === 'partner' ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};">
                    ${product.icon}
                </div>
                <div class="contract-product-info">
                    <h3>${product.name}</h3>
                    <p style="color: var(--text-secondary); margin-top: var(--spacing-xs);">
                        ${product.type}
                        ${product.category === 'partner' ? ` • ${product.partner}` : ''}
                    </p>
                </div>
            </div>
            <div style="padding: var(--spacing-md); background: var(--bg-secondary); border-radius: var(--radius-md); margin-bottom: var(--spacing-lg);">
                <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: var(--spacing-sm);">
                    <strong>Beneficios principales:</strong>
                </p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                    ${product.benefits.slice(0, 3).map(benefit => `
                        <li style="padding: 0.25rem 0; font-size: 0.875rem; color: var(--text-primary); display: flex; gap: 0.5rem;">
                            <span style="color: var(--success);">✓</span>
                            <span>${benefit}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>

        <div class="contract-steps">
            <h4>Proceso de contratación</h4>

            <div class="step completed">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h5>Verificación de identidad</h5>
                    <p>Tu identidad ya fue verificada como cliente del banco</p>
                </div>
            </div>

            <div class="step completed">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h5>Análisis de elegibilidad</h5>
                    <p>Verificamos que cumples con todos los requisitos</p>
                </div>
            </div>

            <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h5>Aceptación de términos</h5>
                    <p>Lee y acepta los términos y condiciones del producto</p>

                    <div class="checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" id="terms-checkbox" onchange="validateContractForm()">
                            <span class="checkbox-text">
                                He leído y acepto los <a href="#" onclick="return false;" style="color: var(--primary);">términos y condiciones</a> del producto.
                            </span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="privacy-checkbox" onchange="validateContractForm()">
                            <span class="checkbox-text">
                                Acepto el tratamiento de mis datos según la <a href="#" onclick="return false;" style="color: var(--primary);">política de privacidad</a>.
                            </span>
                        </label>
                        ${product.category === 'partner' ? `
                            <label class="checkbox-label">
                                <input type="checkbox" id="partner-checkbox" onchange="validateContractForm()">
                                <span class="checkbox-text">
                                    Autorizo compartir mis datos con ${product.partner} para la gestión del producto.
                                </span>
                            </label>
                        ` : ''}
                    </div>
                </div>
            </div>

            <div class="contract-actions">
                <button class="btn btn-success" id="confirm-contract-btn" disabled onclick="confirmContract()">
                    Confirmar contratación
                </button>
                <button class="btn btn-secondary" onclick="backToProducts()">
                    Volver atrás
                </button>
            </div>
        </div>
    `;

    // Mostrar pantalla
    showScreen('contract-screen');
}

/**
 * Valida el formulario de contratación
 */
function validateContractForm() {
    const termsChecked = document.getElementById('terms-checkbox')?.checked;
    const privacyChecked = document.getElementById('privacy-checkbox')?.checked;
    const partnerCheckbox = document.getElementById('partner-checkbox');
    const partnerChecked = !partnerCheckbox || partnerCheckbox.checked;

    const confirmBtn = document.getElementById('confirm-contract-btn');
    if (confirmBtn) {
        confirmBtn.disabled = !(termsChecked && privacyChecked && partnerChecked);
    }
}

/**
 * Confirma la contratación del producto
 */
function confirmContract() {
    const product = window.selectedProduct;
    if (!product) return;

    // Deshabilitar botón
    const confirmBtn = document.getElementById('confirm-contract-btn');
    if (confirmBtn) {
        confirmBtn.disabled = true;
        confirmBtn.innerHTML = 'Procesando...';
    }

    // Simular procesamiento
    setTimeout(() => {
        // Agregar producto a los contratados
        if (!clientProfile.currentProducts.includes(product.name)) {
            clientProfile.currentProducts.push(product.name);
        }

        // Mostrar modal de éxito
        showSuccessModal(product);

        // Limpiar producto seleccionado
        window.selectedProduct = null;
    }, 2000);
}

/**
 * Muestra modal de contratación exitosa
 */
function showSuccessModal(product) {
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');

    successMessage.innerHTML = `
        <strong>${product.name}</strong> ha sido activado/a exitosamente.<br><br>
        ${product.category === 'partner'
            ? `Recibirás un correo de ${product.partner} con los detalles de activación en los próximos minutos.`
            : 'Ya podés comenzar a disfrutar de todos los beneficios.'
        }
    `;

    successModal.classList.add('active');
}

/**
 * Cierra el modal de éxito
 */
function closeSuccessModal() {
    const successModal = document.getElementById('success-modal');
    successModal.classList.remove('active');

    // Volver al chat
    showScreen('chat-screen');

    // Agregar mensaje de confirmación
    setTimeout(() => {
        addMessage('bot', '¡Felicitaciones! Tu producto fue activado exitosamente. ¿Hay algo más en lo que pueda ayudarte?');
        updateQuickSuggestions('afterContract');
    }, 300);
}

// Función auxiliar para agregar mensaje desde pantalla de productos
function addToChat(message) {
    showScreen('chat-screen');
    setTimeout(() => {
        document.getElementById('chat-input').value = message;
        sendMessage();
    }, 300);
}
