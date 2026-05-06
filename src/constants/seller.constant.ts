export const SELLER_MESSAGES = {
  CREATE_SUCCESS: "Vendedor creado exitosamente",
  UPDATE_SUCCESS: "Vendedor actualizado exitosamente",
  DELETE_SUCCESS: "Vendedor eliminado exitosamente",
  NOT_FOUND: "Vendedor no encontrado",
  EMAIL_DUPLICATE: "El email ya existe",
  INVALID_EMAIL: "Email inválido",
  INVALID_PASSWORD: "La contraseña debe tener al menos 6 caracteres",
  INVALID_NAME: "El nombre es requerido",
} as const;

export const ROLE_LABELS = {
  ADMIN: "Administrador",
  SELLER: "Vendedor",
} as const;

export const SELLER_FORM_LABELS = {
  NAME: "Nombre Completo",
  EMAIL: "Email",
  PASSWORD: "Contraseña",
  ROLE: "Rol",
} as const;

export const SELLER_PLACEHOLDERS = {
  NAME: "Ej: Juan Pérez",
  EMAIL: "vendedor@ejemplo.com",
  PASSWORD: "Mínimo 6 caracteres",
} as const;

export const SELLER_TABLE = {
  TITLE: "Vendedores",
  SUBTITLE: "Gestión de usuarios vendedores",
  SEARCH_PLACEHOLDER: "Buscar por nombre o email...",
  EMPTY_MESSAGE: "No hay vendedores registrados",
  ACTIONS: "Acciones",
  NEW_BUTTON: "Nuevo Vendedor",
} as const;

export const SELLER_MODAL = {
  CREATE_TITLE: "Crear Vendedor",
  EDIT_TITLE: "Editar Vendedor",
  VIEW_TITLE: "Ver Vendedor",
  DELETE_TITLE: "Eliminar Vendedor",
  DELETE_DESCRIPTION:
    "¿Estás seguro de que deseas eliminar este vendedor? Esta acción no se puede deshacer.",
  DELETE_CONFIRM: "Eliminar",
  DELETE_CANCEL: "Cancelar",
  SAVE_BUTTON: "Guardar",
  CANCEL_BUTTON: "Cancelar",
} as const;
