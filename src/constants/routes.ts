export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/",
  POS: "/pos",
  PRODUCTS: "/products",
  PRODUCT_NEW: "/products/new",
  PRODUCT_DETAIL: (id: string) => `/products/${id}`,
  INVENTORY: "/inventory",
  SALES: "/sales",
  SALE_DETAIL: (id: string) => `/sales/${id}`,
  CLIENTS: "/clients",
  CLIENT_NEW: "/clients/new",
  CLIENT_DETAIL: (id: string) => `/clients/${id}`,
  REPORTS: "/reports",
  USERS: "/users",
  USER_DETAIL: (id: string) => `/users/${id}`,
  SETTINGS: "/settings",
} as const;

export const ROUTE_LABELS: Record<string, string> = {
  "/": "Inicio",
  "/pos": "Punto de Venta",
  "/products": "Productos",
  "/products/new": "Nuevo Producto",
  "/inventory": "Inventario",
  "/sales": "Ventas",
  "/clients": "Clientes",
  "/reports": "Reportes",
  "/users": "Usuarios",
  "/settings": "Configuración",
} as const;

export const API_ROUTES = {
  AUTH: {
    SESSION: "/api/session",
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
  },
  PRODUCTS: "/api/products",
  PRODUCT: (id: string) => `/api/products/${id}`,
  INVENTORY: "/api/inventory",
  SALES: "/api/sales",
  SALE: (id: string) => `/api/sales/${id}`,
  CLIENTS: "/api/clients",
  CLIENT: (id: string) => `/api/clients/${id}`,
  USERS: "/api/users",
  USER: (id: string) => `/api/users/${id}`,
  REPORTS: {
    SALES: "/api/reports/sales",
    INVENTORY: "/api/reports/inventory",
    MARGINS: "/api/reports/margins",
  },
} as const;

export type RouteKey = keyof typeof ROUTES;
export type ApiRouteKey = keyof typeof API_ROUTES;
