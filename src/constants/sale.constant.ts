export const SALE_MESSAGES = {
  CREATE_SUCCESS: "Venta registrada exitosamente",
  UPDATE_SUCCESS: "Venta actualizada exitosamente",
  DELETE_SUCCESS: "Venta eliminada exitosamente",
  NOT_FOUND: "Venta no encontrada",
  INVALID_ITEMS: "Debe agregar al menos un producto",
  INVALID_QUANTITY: "La cantidad debe ser mayor a 0",
  INSUFFICIENT_STOCK: "Stock insuficiente",
  INVALID_CLIENT: "Cliente inválido",
  INVALID_PAYMENT_METHOD: "Método de pago inválido",
} as const;

export const PAYMENT_METHOD_LABELS = {
  EFECTIVO: "Efectivo",
  TRANSFERENCIA: "Transferencia",
  DEBITO: "Débito",
  CREDITO: "Crédito",
  MERCADOPAGO: "Mercado Pago",
} as const;

export const INVOICE_TYPE_LABELS = {
  A: "Factura A",
  B: "Factura B",
  C: "Factura C",
  TICKET: "Ticket",
} as const;

export const SALE_TABLE = {
  TITLE: "Ventas",
  SUBTITLE: "Historial de transacciones",
  SEARCH_PLACEHOLDER: "Buscar por número de venta o cliente...",
  EMPTY_MESSAGE: "No hay ventas registradas",
  ACTIONS: "Acciones",
} as const;

export const SALE_MODAL = {
  VIEW_TITLE: "Detalle de Venta",
  DELETE_TITLE: "Anular Venta",
  DELETE_DESCRIPTION: "¿Estás seguro de que deseas anular esta venta?",
  DELETE_CONFIRM: "Anular",
  DELETE_CANCEL: "Cancelar",
  CLOSE_BUTTON: "Cerrar",
} as const;
