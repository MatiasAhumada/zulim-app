export const UI_TEXT = {
  GREETINGS: {
    MORNING: "Buenos días",
    AFTERNOON: "Buenas tardes",
    EVENING: "Buenas noches",
  },

  PAGES: {
    DASHBOARD: {
      TITLE: "Dashboard",
      WELCOME: "Bienvenido al Sistema Integral ZULIM",
    },
    PRODUCTS: {
      TITLE: "Productos e Inventario",
      SUBTITLE: "Gestión del catálogo y control de stock",
      NEW_BUTTON: "Nuevo Producto",
      SEARCH_PLACEHOLDER: "Buscar por nombre o SKU...",
      EMPTY_MESSAGE: "No hay productos registrados",
      IMPORT_EXCEL: "Importar Excel",
      EXPORT_EXCEL: "Exportar Excel",
    },
    CLIENTS: {
      TITLE: "Clientes",
      SUBTITLE: "Gestión de clientes para facturación AFIP",
      NEW_BUTTON: "Nuevo Cliente",
      SEARCH_PLACEHOLDER: "Buscar por nombre o CUIT...",
      EMPTY_MESSAGE: "No hay clientes registrados",
    },
    SALES: {
      TITLE: "Ventas",
      SUBTITLE: "Historial de ventas y facturación",
      SEARCH_PLACEHOLDER: "Buscar venta...",
      EMPTY_MESSAGE: "No hay ventas registradas",
      RECENT_SALES: "Ventas Recientes",
      VIEW_ALL: "Ver todas",
      NO_SALES_TODAY: "No hay ventas registradas hoy",
      FIRST_SALE_BUTTON: "Realizar Primera Venta",
    },
    USERS: {
      TITLE: "Usuarios",
      SUBTITLE: "Gestión de usuarios y permisos",
      NEW_BUTTON: "Nuevo Usuario",
      SEARCH_PLACEHOLDER: "Buscar usuario...",
      EMPTY_MESSAGE: "No hay usuarios registrados",
    },
    REPORTS: {
      TITLE: "Reportes",
      SUBTITLE: "Análisis y métricas del negocio",
    },
    POS: {
      TITLE: "Punto de Venta",
      SUBTITLE: "Venta rápida con redondeo a centena",
      SEARCH_PRODUCT: "Buscar Producto",
      CART: "Carrito de Compras",
      ITEMS_COUNT: "items",
      SUMMARY: "Resumen de Venta",
      CHARGE_BUTTON: "Cobrar Venta",
      CLEAR_CART: "Vaciar Carrito",
      KEYBOARD_SHORTCUTS: "Atajos de Teclado",
      SHORTCUTS: {
        SEARCH: "Buscar producto",
        SELECT: "Seleccionar",
        CANCEL: "Cancelar",
      },
    },
    LOGIN: {
      TITLE: "ZULIM",
      SUBTITLE: "Sistema Integral de Gestión",
      EMAIL_LABEL: "Email",
      PASSWORD_LABEL: "Contraseña",
      EMAIL_PLACEHOLDER: "admin@zulim.com",
      PASSWORD_PLACEHOLDER: "••••••••",
      LOGIN_BUTTON: "Iniciar Sesión",
      LOGGING_IN: "Ingresando...",
      ERROR: "Email o contraseña incorrectos",
      TEST_CREDENTIALS: "Credenciales de prueba:",
      TEST_CREDENTIALS_VALUE: "admin@zulim.com / admin123",
    },
  },

  STATS: {
    SALES_TODAY: "VENTAS HOY",
    PRODUCTS: "PRODUCTOS",
    CLIENTS: "CLIENTES",
    LOW_STOCK: "STOCK BAJO",
    NO_SALES: "Sin ventas registradas",
    IN_CATALOG: "En catálogo",
    REGISTERED: "Registrados",
    LOW_STOCK_COUNT: "Con poco stock",
    TOTAL: "Total",
    OUT_OF_STOCK: "Sin Stock",
    TOTAL_VALUE: "Valor Total",
    SALES_TODAY_CARD: "💳 Ventas Hoy",
    TOTAL_DAY: "💰 Total Día",
    AVERAGE_TICKET: "🎫 Ticket Promedio",
  },

  QUICK_ACTIONS: {
    TITLE: "Acciones Rápidas",
    NEW_SALE: "Nueva Venta",
    PRODUCTS: "Productos",
    REPORTS: "Reportes",
    CLIENTS: "Clientes",
  },

  SYSTEM_STATUS: {
    TITLE: "Estado del Sistema",
    DATABASE: "Base de Datos",
    AFIP: "AFIP",
    SYNC: "Sincronización",
    CONNECTED: "Conectada",
    ACTIVE: "Activa",
    PENDING: "Pendiente",
  },

  REPORTS_LIST: {
    SALES_PERIOD: {
      TITLE: "📊 Ventas por Período",
      DESCRIPTION: "Resumen de ventas diarias, semanales y mensuales",
    },
    PRICE_EVOLUTION: {
      TITLE: "📈 Evolución de Precios",
      DESCRIPTION: "Historial de cambios de precio y métricas de inflación",
    },
    PROFIT_MARGINS: {
      TITLE: "💰 Márgenes de Ganancia",
      DESCRIPTION: "Análisis de márgenes por producto y categoría",
    },
    STOCK_ROTATION: {
      TITLE: "📦 Stock y Rotación",
      DESCRIPTION: "Productos con mayor rotación y alertas de stock",
    },
    CLIENTS_AFIP: {
      TITLE: "👥 Clientes AFIP",
      DESCRIPTION: "Clientes por condición fiscal y facturación",
    },
    CASH_REGISTER: {
      TITLE: "📋 Arqueo de Caja",
      DESCRIPTION: "Resumen diario de ventas y métodos de pago",
    },
  },

  TABLE: {
    COLUMNS: {
      SKU: "SKU",
      PRODUCT: "PRODUCTO",
      UNIT: "UNIDAD",
      STOCK: "STOCK",
      COST: "COSTO",
      SALE: "VENTA",
      MARGIN: "MARGEN",
      CLIENT: "Cliente",
      CUIT: "CUIT/CUIL",
      CONDITION: "Condición",
      EMAIL: "Email",
      ADDRESS: "Dirección",
      ID: "ID",
      DATE: "Fecha",
      METHOD: "Método",
      SUBTOTAL: "Subtotal",
      TOTAL: "Total",
      TYPE: "Tipo",
      NAME: "Nombre",
      ROLE: "Rol",
      CREATED: "Creado",
    },
  },

  ROLES: {
    ADMIN: "Administrador",
    SELLER: "Vendedor",
  },

  SIDEBAR: {
    BRAND_NAME: "ZULIM",
    BRAND_SUBTITLE: "Sistema ERP",
    NAV_ITEMS: {
      DASHBOARD: "Dashboard",
      POS: "Punto de Venta",
      PRODUCTS: "Productos",
      SALES: "Ventas",
      CLIENTS: "Clientes",
      REPORTS: "Reportes",
      USERS: "Usuarios",
    },
    USER_DEFAULT: "Usuario",
  },

  POS_COMPONENTS: {
    CART: {
      EMPTY_TITLE: "Carrito vacío",
      EMPTY_SUBTITLE: "Buscar productos para agregar",
      REMOVE_BUTTON: "Eliminar",
    },
    SEARCH: {
      PLACEHOLDER: "Buscar producto por nombre o SKU... (Ctrl+B)",
      SKU_LABEL: "SKU:",
      STOCK_LABEL: "Stock:",
    },
    ROUNDED_TOTAL: {
      SUBTOTAL: "Subtotal",
      ROUNDING: "Redondeo (centena)",
      TOTAL: "Total a Cobrar",
    },
  },

  DATA_TABLE: {
    EMPTY_MESSAGE: "No hay datos disponibles",
    SEARCH_PLACEHOLDER: "Buscar...",
    LOADING: "Cargando...",
  },

  MODAL: {
    CONFIRM_TEXT: "Confirmar",
    CANCEL_TEXT: "Cancelar",
    PROCESSING: "Procesando...",
  },

  COMMON: {
    LOADING: "Cargando...",
    SEARCH: "Buscar...",
    NO_DATA: "No hay datos disponibles",
    CANCEL: "Cancelar",
    CONFIRM: "Confirmar",
    SAVE: "Guardar",
    DELETE: "Eliminar",
    EDIT: "Editar",
    VIEW: "Ver",
    CLOSE: "Cerrar",
  },
} as const;
