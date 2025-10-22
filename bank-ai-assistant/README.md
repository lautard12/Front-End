# 🏦 BankIA - Asistente Bancario Inteligente

## 📋 Descripción

BankIA es un prototipo de asistente conversacional inteligente para bancos que personaliza ofertas de productos financieros y de aliados según el perfil del cliente.

El cliente puede conversar naturalmente con el asistente, quien analiza sus características y comportamientos financieros para ofrecer recomendaciones personalizadas con la posibilidad de contratarlas al instante.

## ✨ Características Principales

### 🎯 Pantalla de Inicio
- Acceso directo al chat inteligente del banco
- Presentación clara de los beneficios del asistente
- Diseño atractivo y profesional

### 💬 Interfaz de Chat Conversacional
- Conversación natural con el asistente IA
- El cliente puede expresar necesidades (ej: "quiero viajar", "necesito organizar mis gastos")
- Respuestas contextuales y personalizadas
- Sugerencias rápidas para facilitar la interacción

### 🤖 Motor de Recomendación IA (Simulado)
- Análisis del perfil del cliente:
  - Ingresos mensuales
  - Edad y ocupación
  - Hábitos de consumo
  - Productos ya contratados
  - Score crediticio
  - Objetivos financieros

- Ofertas personalizadas basadas en:
  - Comportamiento financiero
  - Intenciones detectadas en la conversación
  - Elegibilidad para productos

- Explicaciones claras del porqué de cada recomendación
  - Ejemplo: "Veo que gastás mucho en transporte, te sugiero la tarjeta X con 10% de ahorro en combustible"

### 📱 Pantalla de Productos Recomendados
- Lista de productos adaptados al perfil
- Diferenciación visual entre productos bancarios y de aliados
- Beneficios destacados de cada producto
- Acciones rápidas: "Contratar ahora" o "Más información"

### ⚡ Flujo de Contratación Rápida
- Proceso simplificado en 3 pasos:
  1. Verificación de identidad (automática)
  2. Análisis de elegibilidad (automática)
  3. Aceptación de términos y condiciones
- Contratación en menos de 2 minutos
- Confirmación instantánea

### 🎨 Diseño Visual
- **Mobile First**: Optimizado para dispositivos móviles
- **Moderno y Minimalista**: Interfaz limpia y fácil de usar
- **Colores Bancarios**: Paleta profesional que transmite confianza
- **Iconografía Clara**: Diferenciación visual entre productos bancarios y de aliados
- **Animaciones Suaves**: Experiencia de usuario fluida

## 🗂️ Estructura del Proyecto

```
bank-ai-assistant/
├── index.html              # Estructura HTML principal
├── css/
│   └── styles.css          # Estilos completos (mobile-first)
├── js/
│   ├── aiEngine.js         # Motor de IA y lógica de recomendaciones
│   ├── products.js         # Gestión de productos y visualización
│   └── app.js              # Lógica principal de la aplicación
└── README.md               # Este archivo
```

## 🚀 Cómo Usar

### Instalación

1. Clonar o descargar el proyecto
2. Abrir `index.html` en un navegador web moderno

**No requiere instalación de dependencias ni servidor.**

### Flujo de Uso

1. **Inicio**: Hacer click en "Empezar conversación"
2. **Conversación**: Escribir necesidades o usar sugerencias rápidas
   - Ejemplos:
     - "Quiero viajar"
     - "Necesito organizar mis gastos"
     - "Quiero ahorrar para el futuro"
3. **Recomendaciones**: El asistente mostrará productos personalizados
4. **Ver Detalles**: Explorar beneficios de cada producto
5. **Contratar**: Proceso rápido de contratación en 3 pasos
6. **Confirmación**: Recibir confirmación instantánea

### Funcionalidades Adicionales

- **Ver Perfil**: Click en el ícono de usuario en el chat para ver el perfil completo del cliente
- **Sugerencias Rápidas**: Chips en la parte inferior del chat con opciones comunes
- **Navegación Fluida**: Flechas de retroceso en cada pantalla

## 🎭 Perfil de Cliente Simulado

El prototipo incluye un perfil de cliente de ejemplo:

- **Nombre**: María González
- **Edad**: 32 años
- **Ocupación**: Diseñadora Gráfica
- **Ingresos**: $85,000 mensuales
- **Score Crediticio**: 750
- **Objetivo**: Viaje

**Hábitos de Consumo**:
- Transporte: Alto (25%)
- Entretenimiento: Medio (15%)
- Compras: Medio (20%)
- Viajes: Bajo (5%)
- Alimentación: Medio (20%)

## 💳 Productos Disponibles

### Productos del Banco

1. **Tarjeta Viajero Premium**
   - 0% comisión internacional
   - Acumulación de millas
   - Acceso a salas VIP

2. **Cuenta Ahorro Inteligente**
   - 6% tasa anual
   - Metas personalizadas
   - Ahorro automático

3. **Préstamo Personal Express**
   - Hasta $500,000
   - Aprobación en 24 horas
   - Sin garantías

4. **Tarjeta Movilidad**
   - 10% OFF en combustible
   - Cashback en peajes
   - Descuentos en movilidad

5. **Inversión a Plazo Fijo**
   - 8% rendimiento garantizado
   - Plazos flexibles
   - Capital garantizado

### Productos de Aliados

1. **Seguro de Viaje Internacional** (Seguros Global)
2. **App Finanzas Personales Pro** (FinTech Solutions)
3. **Club de Entretenimiento** (Entertainment Plus)
4. **Programa Wellness Total** (Vida Saludable)

## 🧠 Motor de IA

### Detección de Intenciones

El motor analiza el mensaje del usuario y detecta intenciones basándose en keywords:

- **Viaje**: viaje, viajar, vacaciones, internacional, millas
- **Ahorro**: ahorro, ahorrar, guardar, meta, objetivo
- **Transporte**: transporte, combustible, movilidad, uber
- **Crédito**: crédito, préstamo, financiamiento
- **Inversión**: inversión, invertir, rendimiento
- **Gastos**: gastos, control, presupuesto, finanzas

### Sistema de Recomendaciones

1. **Análisis de Elegibilidad**
   - Verifica ingresos mínimos
   - Valida score crediticio

2. **Matching de Intenciones**
   - Busca productos que coincidan con las intenciones detectadas
   - Prioriza productos más relevantes

3. **Análisis de Perfil**
   - Si no hay coincidencias directas, usa el perfil financiero
   - Analiza hábitos de consumo
   - Considera objetivos financieros

4. **Explicaciones Personalizadas**
   - Genera razones específicas para cada recomendación
   - Usa datos reales del perfil del cliente

## 🎨 Paleta de Colores

- **Primary**: `#667eea` - `#764ba2` (Gradiente principal)
- **Success**: `#10b981` (Verde para confirmaciones)
- **Warning**: `#f59e0b` (Amarillo para alertas)
- **Error**: `#ef4444` (Rojo para errores)
- **Info**: `#3b82f6` (Azul para información)

## 📱 Responsive Design

- **Mobile**: 320px - 767px (optimizado)
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

El diseño es **mobile-first**, con mejoras progresivas para pantallas más grandes.

## ⚙️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica moderna
- **CSS3**: Estilos avanzados con variables CSS, Grid, Flexbox
- **JavaScript Vanilla**: Sin dependencias externas
- **SVG**: Iconos y gráficos vectoriales

## 🔄 Flujo de Datos

```
Usuario escribe mensaje
    ↓
Análisis de intención (aiEngine.js)
    ↓
Generación de recomendaciones
    ↓
Respuesta conversacional
    ↓
Visualización de productos (products.js)
    ↓
Selección de producto
    ↓
Flujo de contratación
    ↓
Confirmación y actualización de perfil
```

## 🎯 Casos de Uso Demostrados

### Caso 1: Cliente que quiere viajar
```
Usuario: "Quiero viajar al exterior"
IA: Analiza perfil → Recomienda Tarjeta Viajero + Seguro de Viaje
Explicación: Basado en objetivo de viaje y elegibilidad
```

### Caso 2: Cliente con altos gastos en transporte
```
Usuario: "Necesito ahorrar en combustible"
IA: Detecta gasto alto en transporte → Recomienda Tarjeta Movilidad
Explicación: "Veo que gastás el 25% en transporte, esta tarjeta te da 10% OFF"
```

### Caso 3: Cliente que quiere organizar finanzas
```
Usuario: "Necesito controlar mis gastos"
IA: Recomienda App Finanzas + Cuenta Ahorro Inteligente
Explicación: Herramientas para visualización y ahorro automático
```

## 🔧 Personalización

### Modificar el Perfil del Cliente

Editar en `js/aiEngine.js`:

```javascript
const clientProfile = {
    name: "Tu Nombre",
    age: 30,
    monthlyIncome: 100000,
    // ... más campos
};
```

### Agregar Nuevos Productos

Agregar al array `bankProducts` o `partnerProducts` en `js/aiEngine.js`:

```javascript
{
    id: "mi_producto",
    name: "Nombre del Producto",
    type: "Tipo",
    category: "bank", // o "partner"
    icon: "🎯",
    description: "Descripción...",
    benefits: ["Beneficio 1", "Beneficio 2"],
    tags: ["tag1", "tag2"],
    eligibility: {
        minIncome: 50000,
        minCreditScore: 600
    }
}
```

### Agregar Nuevas Intenciones

Editar `intentKeywords` en `js/aiEngine.js`:

```javascript
const intentKeywords = {
    nueva_intencion: ["keyword1", "keyword2", "keyword3"],
    // ...
};
```

## 📊 Métricas Demostradas

- ⏱️ **Tiempo de recomendación**: < 2 segundos
- 🎯 **Precisión de recomendaciones**: Basada en perfil y contexto
- 📱 **Experiencia de usuario**: Conversacional y natural
- ⚡ **Tiempo de contratación**: < 2 minutos (3 clicks)

## 🚧 Limitaciones del Prototipo

- Datos simulados (no conecta con backend real)
- Un solo perfil de cliente hardcodeado
- No persiste datos (se pierde al recargar)
- No incluye autenticación real
- Productos y beneficios son ejemplos

## 🔮 Posibles Mejoras Futuras

- [ ] Integración con backend real
- [ ] Múltiples perfiles de cliente
- [ ] Persistencia de datos (localStorage/base de datos)
- [ ] Análisis de sentimiento en los mensajes
- [ ] Recomendaciones basadas en machine learning real
- [ ] Notificaciones push
- [ ] Historial de conversaciones
- [ ] Exportar conversación a PDF
- [ ] Compartir productos por WhatsApp/Email
- [ ] Modo oscuro
- [ ] Soporte multi-idioma

## 📞 Soporte

Este es un prototipo de demostración. Para preguntas o sugerencias sobre el código, consultar el código fuente.

## 📄 Licencia

Prototipo de demostración - Libre para uso educativo y de evaluación.

---

**Desarrollado con tecnologías web modernas | Mobile First | UX optimizada**

🚀 ¡Abrí `index.html` en tu navegador y probá el asistente!
