# ZULIM Sistema ERP

> Sistema de gestión empresarial completo para control de ventas, inventario y administración

Sistema ERP moderno desarrollado con Next.js 16, diseñado para optimizar la gestión de negocios con punto de venta integrado, control de inventario, gestión de clientes y reportes en tiempo real.

## 🚀 Stack Tecnológico

| Categoría           | Tecnologías             |
| ------------------- | ----------------------- |
| **Framework**       | Next.js 16 (App Router) |
| **Lenguaje**        | TypeScript 5            |
| **Base de Datos**   | PostgreSQL + Prisma 7   |
| **Estilos**         | Tailwind CSS 4          |
| **Componentes**     | shadcn/ui + Radix UI    |
| **Iconos**          | Hugeicons React         |
| **Animaciones**     | Framer Motion           |
| **HTTP Client**     | Axios                   |
| **Validación**      | Zod                     |
| **Notificaciones**  | Sonner                  |
| **Package Manager** | pnpm                    |

## ✨ Características Principales

### 📊 Módulos del Sistema

- **Dashboard** - Panel de control con métricas y estadísticas en tiempo real
- **Punto de Venta (POS)** - Sistema de ventas rápido e intuitivo
- **Productos** - Gestión completa de inventario y catálogo
- **Ventas** - Historial y seguimiento de transacciones
- **Clientes** - Base de datos de clientes y historial de compras
- **Reportes** - Análisis y reportes detallados del negocio
- **Usuarios** - Administración de usuarios y roles (Admin/Vendedor)

### 🏗️ Arquitectura Escalable

```
src/
├── app/                 # Rutas y páginas (App Router)
│   ├── (home)/         # Rutas protegidas del sistema
│   ├── api/            # API Routes
│   └── login/          # Autenticación
├── components/
│   ├── common/         # Componentes reutilizables
│   ├── layout/         # Sidebar y estructura
│   ├── pos/            # Componentes del punto de venta
│   └── ui/             # Componentes base (shadcn)
├── constants/          # Constantes y configuraciones
├── lib/                # Utilidades y hooks
├── server/             # Lógica backend
│   ├── repository/     # Acceso a datos
│   └── services/       # Lógica de negocio
├── services/           # Servicios frontend
├── types/              # Definiciones TypeScript
└── utils/              # Utilidades y handlers
```

### 🎨 Interfaz de Usuario

- **Sidebar Colapsable** - Navegación intuitiva con animaciones fluidas
- **Tema Personalizado** - Paleta de colores púrpura profesional
- **Responsive Design** - Adaptable a cualquier dispositivo
- **Animaciones Suaves** - Transiciones con Framer Motion
- **Componentes Reutilizables** - DataTable, Modales genéricos

### 🔐 Seguridad y Autenticación

- Sistema de autenticación con roles (Admin/Vendedor)
- Rutas protegidas con middleware
- Gestión de sesiones segura
- Validación de datos con Zod

## 🛠️ Comandos Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor en puerto 3013
pnpm build            # Build de producción
pnpm start            # Inicia servidor de producción

# Base de datos
pnpm migrate          # Crea y aplica migración
pnpm migrate:deploy   # Aplica migraciones en producción
pnpm reset            # Resetea la base de datos
pnpm studio           # Abre Prisma Studio

# Código
pnpm format           # Formatea con Prettier
pnpm lint             # Ejecuta ESLint
```

## 📋 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd zulim-app
```

### 2. Instalar Dependencias

```bash
pnpm install
```

### 3. Configurar Variables de Entorno

```bash
copy .env.example .env
```

Edita `.env` con tus credenciales:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/zulim"
NODE_ENV="development"
NEXT_PUBLIC_API_URL=""
```

### 4. Configurar Base de Datos

```bash
pnpm prisma generate
pnpm migrate
```

### 5. Iniciar Desarrollo

```bash
pnpm dev
```

Visita `http://localhost:3013`

## 🎯 Roles y Permisos

### Administrador

- Acceso completo a todos los módulos
- Gestión de usuarios
- Configuración del sistema
- Reportes avanzados

### Vendedor

- Punto de venta
- Consulta de productos
- Historial de ventas propias
- Dashboard básico

## 📦 Patrones y Mejores Prácticas

- **Repository Pattern** - Abstracción del acceso a datos
- **Service Layer** - Lógica de negocio separada
- **TypeScript Estricto** - Sin uso de `any`
- **Constantes Centralizadas** - Sin valores hardcodeados
- **Manejo de Errores** - Sistema centralizado de errores
- **Código Limpio** - Funciones pequeñas y responsabilidad única
- **REST Compliant** - APIs siguiendo estándares REST

## 🔒 Estándares de Código

- ✅ TypeScript estricto
- ✅ Sin comparaciones explícitas con null/undefined
- ✅ Nombres descriptivos y semánticos
- ✅ Principios SOLID
- ✅ Validación de datos con Zod
- ✅ Manejo centralizado de errores
- ✅ Código formateado con Prettier

## 📱 Capturas de Pantalla

_Sistema en desarrollo - Capturas próximamente_

## 🚀 Roadmap

- [ ] Sistema de reportes avanzados
- [ ] Integración con impresoras térmicas
- [ ] Módulo de compras a proveedores
- [ ] Sistema de notificaciones en tiempo real
- [ ] Aplicación móvil
- [ ] Integración con pasarelas de pago

## 👨‍💻 Desarrollador

**Matias Ahumada**

- 📱 Tel: 3813528658
- 💼 Desarrollador Full Stack
- 🎯 Especializado en Next.js, TypeScript y PostgreSQL

## 📄 Licencia

Todos los derechos reservados © 2025 Matias Ahumada

---

**Desarrollado con ❤️ por Matias Ahumada usando Next.js, TypeScript y las mejores prácticas de la industria.**
