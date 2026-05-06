export const CLIENT_MESSAGES = {
  CREATE_SUCCESS: "Cliente creado exitosamente",
  UPDATE_SUCCESS: "Cliente actualizado exitosamente",
  DELETE_SUCCESS: "Cliente eliminado exitosamente",
  NOT_FOUND: "Cliente no encontrado",
  TAX_ID_DUPLICATE: "El CUIT/CUIL/DNI ya existe",
  INVALID_TAX_ID: "CUIT/CUIL/DNI inválido",
  INVALID_NAME: "El nombre es requerido",
  INVALID_TAX_CONDITION: "La condición fiscal es requerida",
} as const;

export const TAX_CONDITION_OPTIONS = [
  { value: "RESPONSABLE_INSCRIPTO", label: "Responsable Inscripto" },
  { value: "MONOTRIBUTO", label: "Monotributo" },
  { value: "CONSUMIDOR_FINAL", label: "Consumidor Final" },
  { value: "EXENTO", label: "Exento" },
] as const;

export const CLIENT_FORM_LABELS = {
  NAME: "Nombre / Razón Social",
  TAX_ID: "CUIT/CUIL/DNI",
  TAX_CONDITION: "Condición Fiscal",
  EMAIL: "Email",
  PHONE: "Teléfono",
  ADDRESS: "Dirección",
} as const;

export const CLIENT_PLACEHOLDERS = {
  NAME: "Ej: Juan Pérez / Empresa SA",
  TAX_ID: "20-12345678-9",
  EMAIL: "cliente@ejemplo.com",
  PHONE: "3815551234",
  ADDRESS: "Calle 123, Ciudad",
} as const;

export const CLIENT_TABLE = {
  TITLE: "Clientes",
  SUBTITLE: "Gestión de clientes y consumidores",
  SEARCH_PLACEHOLDER: "Buscar por nombre o CUIT/CUIL/DNI...",
  EMPTY_MESSAGE: "No hay clientes registrados",
  ACTIONS: "Acciones",
  NEW_BUTTON: "Nuevo Cliente",
} as const;

export const CLIENT_MODAL = {
  CREATE_TITLE: "Crear Cliente",
  EDIT_TITLE: "Editar Cliente",
  VIEW_TITLE: "Ver Cliente",
  DELETE_TITLE: "Eliminar Cliente",
  DELETE_DESCRIPTION: "¿Estás seguro de que deseas eliminar este cliente?",
  DELETE_CONFIRM: "Eliminar",
  DELETE_CANCEL: "Cancelar",
  SAVE_BUTTON: "Guardar",
  CANCEL_BUTTON: "Cancelar",
} as const;
