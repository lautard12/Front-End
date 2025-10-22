/**
 * Motor de IA para recomendaciones personalizadas
 * Simula análisis de perfil de cliente y generación de recomendaciones
 */

// Perfil del cliente (simulado)
const clientProfile = {
    name: "María González",
    age: 32,
    monthlyIncome: 85000,
    occupation: "Diseñadora Gráfica",
    spendingHabits: {
        transport: "alto",      // 25% del ingreso
        entertainment: "medio",  // 15% del ingreso
        shopping: "medio",       // 20% del ingreso
        travel: "bajo",          // 5% del ingreso
        food: "medio"            // 20% del ingreso
    },
    currentProducts: [
        "Cuenta corriente",
        "Tarjeta de débito"
    ],
    creditScore: 750,
    savingsGoal: "viaje",
    financialProfile: "joven_profesional"
};

// Base de conocimiento de productos del banco
const bankProducts = [
    {
        id: "tarjeta_viajero",
        name: "Tarjeta Viajero Premium",
        type: "Tarjeta de Crédito",
        category: "bank",
        icon: "✈️",
        description: "Tarjeta de crédito internacional sin comisión por uso en el exterior",
        benefits: [
            "0% comisión en compras internacionales",
            "Acumulación de millas por cada $100 gastados",
            "Acceso a salas VIP en aeropuertos",
            "Seguro de viaje incluido",
            "Cashback del 2% en todas tus compras"
        ],
        tags: ["viaje", "internacional", "millas", "premium"],
        eligibility: {
            minIncome: 50000,
            minCreditScore: 650
        }
    },
    {
        id: "cuenta_ahorro_inteligente",
        name: "Cuenta Ahorro Inteligente",
        type: "Cuenta de Ahorro",
        category: "bank",
        icon: "💰",
        description: "Cuenta de ahorro con tasa preferencial y metas personalizadas",
        benefits: [
            "Tasa de interés del 6% anual",
            "Sin comisiones de mantenimiento",
            "Ahorro automático programable",
            "Metas de ahorro personalizadas",
            "Redondeo automático de compras"
        ],
        tags: ["ahorro", "metas", "interes"],
        eligibility: {
            minIncome: 20000,
            minCreditScore: 0
        }
    },
    {
        id: "prestamo_consumo",
        name: "Préstamo Personal Express",
        type: "Préstamo",
        category: "bank",
        icon: "💵",
        description: "Préstamo personal con aprobación en 24 horas",
        benefits: [
            "Hasta $500,000 disponibles",
            "Tasa desde 18% anual",
            "Plazo de hasta 48 meses",
            "Aprobación en 24 horas",
            "Sin garantías requeridas"
        ],
        tags: ["prestamo", "rapido", "flexible"],
        eligibility: {
            minIncome: 30000,
            minCreditScore: 600
        }
    },
    {
        id: "tarjeta_transporte",
        name: "Tarjeta Movilidad",
        type: "Tarjeta de Débito",
        category: "bank",
        icon: "🚗",
        description: "Tarjeta con beneficios exclusivos en transporte y combustible",
        benefits: [
            "10% de descuento en combustible",
            "5% de cashback en peajes",
            "Descuentos en servicios de movilidad (Uber, Cabify)",
            "Sin costo de mantenimiento",
            "Acumulación de puntos por uso"
        ],
        tags: ["transporte", "combustible", "descuentos"],
        eligibility: {
            minIncome: 25000,
            minCreditScore: 0
        }
    },
    {
        id: "inversion_plazo_fijo",
        name: "Inversión a Plazo Fijo",
        type: "Inversión",
        category: "bank",
        icon: "📈",
        description: "Inversión segura con rendimientos garantizados",
        benefits: [
            "Rendimiento del 8% anual garantizado",
            "Plazos desde 30 días",
            "Capital garantizado",
            "Renovación automática opcional",
            "Liquidez anticipada disponible"
        ],
        tags: ["inversion", "seguro", "rendimiento"],
        eligibility: {
            minIncome: 40000,
            minCreditScore: 0
        }
    }
];

// Productos de aliados
const partnerProducts = [
    {
        id: "seguro_viaje",
        name: "Seguro de Viaje Internacional",
        type: "Seguro",
        category: "partner",
        partner: "Seguros Global",
        icon: "🛡️",
        description: "Protección completa para tus viajes al exterior",
        benefits: [
            "Cobertura médica hasta $100,000 USD",
            "Cancelación de viaje cubierta",
            "Pérdida de equipaje incluida",
            "Asistencia 24/7 en español",
            "20% de descuento para clientes del banco"
        ],
        tags: ["seguro", "viaje", "internacional"],
        eligibility: {
            minIncome: 0,
            minCreditScore: 0
        }
    },
    {
        id: "app_finanzas",
        name: "App Finanzas Personales Pro",
        type: "Aplicación",
        category: "partner",
        partner: "FinTech Solutions",
        icon: "📱",
        description: "Control total de tus finanzas en una sola app",
        benefits: [
            "Análisis automático de gastos",
            "Presupuestos inteligentes",
            "Alertas de sobregasto",
            "Consejos personalizados de ahorro",
            "3 meses gratis para clientes del banco"
        ],
        tags: ["app", "finanzas", "control", "ahorro"],
        eligibility: {
            minIncome: 0,
            minCreditScore: 0
        }
    },
    {
        id: "descuentos_entretenimiento",
        name: "Club de Entretenimiento",
        type: "Programa de Beneficios",
        category: "partner",
        partner: "Entertainment Plus",
        icon: "🎬",
        description: "Descuentos exclusivos en cine, teatro y eventos",
        benefits: [
            "30% OFF en cines los miércoles",
            "20% en obras de teatro",
            "Acceso preferencial a conciertos",
            "2x1 en eventos deportivos",
            "Sin costo de inscripción"
        ],
        tags: ["entretenimiento", "descuentos", "eventos"],
        eligibility: {
            minIncome: 0,
            minCreditScore: 0
        }
    },
    {
        id: "programa_wellness",
        name: "Programa Wellness Total",
        type: "Programa de Salud",
        category: "partner",
        partner: "Vida Saludable",
        icon: "🏃",
        description: "Cuida tu salud con beneficios exclusivos",
        benefits: [
            "50% OFF en gimnasios asociados",
            "Consultas nutricionales gratuitas",
            "Descuentos en productos saludables",
            "App de seguimiento de actividad",
            "Retos mensuales con premios"
        ],
        tags: ["salud", "bienestar", "fitness"],
        eligibility: {
            minIncome: 0,
            minCreditScore: 0
        }
    }
];

// Intenciones del usuario y keywords asociadas
const intentKeywords = {
    viaje: ["viaje", "viajar", "viajo", "vacaciones", "exterior", "internacional", "país", "países", "avión", "aeropuerto", "millas"],
    ahorro: ["ahorro", "ahorrar", "guardar", "dinero", "futuro", "meta", "objetivo", "juntar"],
    transporte: ["transporte", "movilidad", "combustible", "gasolina", "uber", "cabify", "peaje", "auto", "coche"],
    credito: ["crédito", "prestamo", "préstamo", "dinero", "financiamiento", "comprar"],
    entretenimiento: ["entretenimiento", "cine", "teatro", "eventos", "concierto", "diversión", "ocio"],
    inversion: ["inversión", "invertir", "rendimiento", "ganancias", "capital"],
    gastos: ["gastos", "gastar", "control", "organizar", "finanzas", "presupuesto"],
    salud: ["salud", "gimnasio", "ejercicio", "bienestar", "fitness", "wellness"]
};

/**
 * Analiza el mensaje del usuario y detecta intenciones
 */
function analyzeIntent(message) {
    const messageLower = message.toLowerCase();
    const detectedIntents = [];

    for (const [intent, keywords] of Object.entries(intentKeywords)) {
        for (const keyword of keywords) {
            if (messageLower.includes(keyword)) {
                detectedIntents.push(intent);
                break;
            }
        }
    }

    return detectedIntents;
}

/**
 * Genera recomendaciones basadas en el perfil y las intenciones
 */
function getRecommendations(intents) {
    const allProducts = [...bankProducts, ...partnerProducts];
    const recommendations = [];

    // Filtrar productos elegibles
    const eligibleProducts = allProducts.filter(product => {
        return product.eligibility.minIncome <= clientProfile.monthlyIncome &&
               product.eligibility.minCreditScore <= clientProfile.creditScore;
    });

    // Buscar productos que coincidan con intenciones
    for (const intent of intents) {
        const matchingProducts = eligibleProducts.filter(product =>
            product.tags.includes(intent)
        );
        recommendations.push(...matchingProducts);
    }

    // Si no hay coincidencias, recomendar basado en perfil
    if (recommendations.length === 0) {
        recommendations.push(...getProfileBasedRecommendations(eligibleProducts));
    }

    // Eliminar duplicados
    const uniqueRecommendations = Array.from(new Set(recommendations.map(p => p.id)))
        .map(id => recommendations.find(p => p.id === id));

    // Limitar a 4 productos
    return uniqueRecommendations.slice(0, 4);
}

/**
 * Recomendaciones basadas solo en el perfil del cliente
 */
function getProfileBasedRecommendations(eligibleProducts) {
    const recommendations = [];

    // Analizar hábitos de gasto
    if (clientProfile.spendingHabits.transport === "alto") {
        const transportProduct = eligibleProducts.find(p => p.id === "tarjeta_transporte");
        if (transportProduct) recommendations.push(transportProduct);
    }

    if (clientProfile.savingsGoal === "viaje") {
        const travelProduct = eligibleProducts.find(p => p.id === "tarjeta_viajero");
        const savingsProduct = eligibleProducts.find(p => p.id === "cuenta_ahorro_inteligente");
        if (travelProduct) recommendations.push(travelProduct);
        if (savingsProduct) recommendations.push(savingsProduct);
    }

    // Productos generales útiles
    const generalProducts = eligibleProducts.filter(p =>
        !recommendations.find(r => r.id === p.id)
    ).slice(0, 2);

    return [...recommendations, ...generalProducts];
}

/**
 * Genera una respuesta conversacional del bot
 */
function generateBotResponse(userMessage, intents, recommendations) {
    const responses = {
        greeting: [
            "¡Hola! Soy tu asistente financiero inteligente. Estoy aquí para ayudarte a encontrar los mejores productos para ti.",
            "¡Bienvenido/a! Cuéntame, ¿en qué puedo ayudarte hoy?",
            "Hola, es un gusto poder ayudarte. ¿Qué necesitas?"
        ],
        viaje: [
            "Veo que te interesa viajar. Tengo excelentes opciones para ti que te ayudarán a maximizar tus beneficios en el exterior.",
            "¡Qué emocionante! Para tus planes de viaje, te recomiendo productos que te darán grandes ventajas internacionales.",
            "Perfecto, analicé tu perfil y encontré productos ideales para viajeros como tú."
        ],
        ahorro: [
            "Excelente decisión pensar en ahorrar. He encontrado opciones que se adaptan perfectamente a tus metas.",
            "El ahorro es fundamental. Basándome en tu perfil, estas son las mejores alternativas para ti.",
            "Te felicito por pensar en tu futuro. Aquí tienes productos diseñados para ayudarte a alcanzar tus objetivos."
        ],
        transporte: [
            `Veo que gastás mucho en transporte (aproximadamente el 25% de tus ingresos). Tengo productos que te ayudarán a optimizar estos gastos.`,
            "Analizando tus hábitos de consumo, noté que el transporte es uno de tus mayores gastos. Te conviene ver estas opciones.",
            "Perfecto, tengo soluciones que te permitirán ahorrar significativamente en tus gastos de movilidad."
        ],
        gastos: [
            "Entiendo que quieres organizar mejor tus finanzas. He seleccionado herramientas que te ayudarán a tener un mejor control.",
            "La organización financiera es clave. Estas opciones te permitirán visualizar y controlar mejor tu dinero.",
            "Basándome en tu perfil, estos productos son ideales para gestionar tus gastos de forma inteligente."
        ],
        default: [
            "Entiendo. Déjame analizar tu perfil para encontrar las mejores opciones para ti.",
            "Perfecto, revisando tus características financieras, he encontrado estos productos que podrían interesarte.",
            "Basándome en tu perfil y necesidades, te recomiendo revisar estas opciones."
        ]
    };

    // Seleccionar respuesta apropiada
    let responseArray = responses.default;

    // Detectar saludos
    if (/^(hola|buenos|buenas|hey|hi)/i.test(userMessage)) {
        return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
    }

    // Usar la primera intención detectada
    if (intents.length > 0 && responses[intents[0]]) {
        responseArray = responses[intents[0]];
    }

    const baseResponse = responseArray[Math.floor(Math.random() * responseArray.length)];

    // Si hay recomendaciones, agregar texto adicional
    if (recommendations.length > 0) {
        return `${baseResponse}\n\nEncontré ${recommendations.length} productos que se ajustan perfectamente a tu perfil:`;
    }

    return baseResponse;
}

/**
 * Genera explicación de por qué se recomienda un producto
 */
function getRecommendationReason(product, intents) {
    const reasons = {
        tarjeta_viajero: [
            `Basándome en tu objetivo de viaje y tus ingresos de $${clientProfile.monthlyIncome.toLocaleString()}, esta tarjeta te permitirá ahorrar significativamente en el exterior.`,
            "Veo que tienes planes de viajar. Con esta tarjeta acumularás millas para futuros viajes."
        ],
        cuenta_ahorro_inteligente: [
            `Con tu ingreso mensual de $${clientProfile.monthlyIncome.toLocaleString()}, podrías ahorrar automáticamente y alcanzar tu meta de ${clientProfile.savingsGoal} más rápido.`,
            "Esta cuenta te ayudará a organizar tus ahorros de forma inteligente y automatizada."
        ],
        tarjeta_transporte: [
            `Noté que gastás aproximadamente el 25% de tus ingresos en transporte. Esta tarjeta te permitiría ahorrar hasta un 10% en combustible.`,
            "Basándome en tus hábitos de gasto en transporte, esta tarjeta te generará ahorros significativos."
        ],
        prestamo_consumo: [
            `Con tu score crediticio de ${clientProfile.creditScore} y tu ingreso, calificas para tasas preferenciales.`,
            "Tu perfil financiero te permite acceder a este préstamo con excelentes condiciones."
        ],
        seguro_viaje: [
            "Como cliente del banco que planea viajar, obtienes un 20% de descuento en este seguro.",
            "Complementa perfectamente tu tarjeta de viajero para una protección completa."
        ],
        app_finanzas: [
            "Esta app te ayudará a visualizar tus gastos y optimizar tu presupuesto mensual.",
            "Con 3 meses gratis, podrás organizar mejor tus finanzas personales."
        ]
    };

    return reasons[product.id] ?
        reasons[product.id][0] :
        "Este producto se adapta a tu perfil financiero y necesidades actuales.";
}

/**
 * Genera sugerencias rápidas basadas en el contexto
 */
function getQuickSuggestions(conversationStage) {
    const suggestions = {
        initial: [
            "Quiero viajar",
            "Necesito organizar mis gastos",
            "Quiero ahorrar",
            "Busco inversiones"
        ],
        afterRecommendation: [
            "Cuéntame más sobre la tarjeta",
            "¿Qué otros productos tenés?",
            "¿Cómo contrato?",
            "Ver todas las opciones"
        ],
        afterContract: [
            "¿Qué más me recomendás?",
            "Volver al inicio",
            "Ver mi perfil"
        ]
    };

    return suggestions[conversationStage] || suggestions.initial;
}

/**
 * Simula delay de procesamiento de IA
 */
function simulateAIProcessing() {
    return new Promise(resolve => {
        setTimeout(resolve, 1000 + Math.random() * 1000);
    });
}

// Exportar funciones para uso en app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        clientProfile,
        bankProducts,
        partnerProducts,
        analyzeIntent,
        getRecommendations,
        generateBotResponse,
        getRecommendationReason,
        getQuickSuggestions,
        simulateAIProcessing
    };
}
