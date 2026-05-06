export const PRODUCT_MESSAGES = {
  CREATE_SUCCESS: "Producto creado exitosamente",
  UPDATE_SUCCESS: "Producto actualizado exitosamente",
  DELETE_SUCCESS: "Producto eliminado exitosamente",
  NOT_FOUND: "Producto no encontrado",
  SKU_DUPLICATE: "El SKU ya existe",
  INVALID_STOCK: "El stock debe ser mayor o igual a 0",
  INVALID_PRICE: "El precio debe ser mayor a 0",
  INVALID_MARGIN: "El margen debe estar entre 0 y 100",
} as const;

export const UNIT_TYPE_LABELS = {
  KG: "Kilogramos",
  METERS: "Metros",
  UNIT: "Unidad",
} as const;

export const PRODUCT_FORM_LABELS = {
  NAME: "Nombre",
  SKU: "SKU",
  DESCRIPTION: "Descripción",
  UNIT_TYPE: "Tipo de Unidad",
  MIN_SALE_QUANTITY: "Cantidad Mínima de Venta",
  MAX_SALE_QUANTITY: "Cantidad Máxima de Venta",
  PURCHASE_PRICE: "Precio de Compra",
  PROFIT_MARGIN: "Margen de Ganancia (%)",
  RETAIL_PRICE: "Precio Minorista",
  WHOLESALE_PRICE: "Precio Mayorista",
  SALE_PRICE: "Precio de Venta",
  STOCK: "Stock",
} as const;

export const PRODUCT_PLACEHOLDERS = {
  NAME: "Ej: Tornillo 5mm",
  SKU: "Ej: TOR-5MM-001",
  DESCRIPTION: "Descripción del producto (opcional)",
  MIN_SALE_QUANTITY: "1",
  MAX_SALE_QUANTITY: "100",
  PURCHASE_PRICE: "0.00",
  PROFIT_MARGIN: "30",
  RETAIL_PRICE: "0.00",
  WHOLESALE_PRICE: "0.00",
  STOCK: "0",
} as const;

export const PRODUCT_TABLE = {
  TITLE: "Productos",
  SUBTITLE: "Gestión de catálogo de productos",
  SEARCH_PLACEHOLDER: "Buscar por nombre o SKU...",
  EMPTY_MESSAGE: "No hay productos registrados",
  ACTIONS: "Acciones",
  NEW_BUTTON: "Nuevo Producto",
} as const;

export const PRODUCT_MODAL = {
  CREATE_TITLE: "Crear Producto",
  EDIT_TITLE: "Editar Producto",
  VIEW_TITLE: "Ver Producto",
  DELETE_TITLE: "Eliminar Producto",
  DELETE_DESCRIPTION: "¿Estás seguro de que deseas eliminar este producto?",
  DELETE_CONFIRM: "Eliminar",
  DELETE_CANCEL: "Cancelar",
  SAVE_BUTTON: "Guardar",
  CANCEL_BUTTON: "Cancelar",
} as const;
