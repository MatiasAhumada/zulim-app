CONTEXTO DE PROYECTO: SISTEMA INTEGRAL ZULIM (SIZ)

1. Perfil del Proyecto:
   Se requiere el diseño de un sistema SaaS de gestión comercial y ERP ligero para una empresa dedicada a la venta y distribución. El sistema debe ser altamente técnico, sobrio y optimizado para el manejo de grandes volúmenes de datos (carga masiva).

2. Roles y Accesos:

Admin (Dueño): Vista estratégica. Control de márgenes de ganancia, auditoría de historial de precios (métricas de inflación interna) y gestión de usuarios.

Vendedor (Operativo): Vista de alto rendimiento. Enfoque en Punto de Venta (POS), facturación rápida y arqueo de caja diaria.

3. Funcionalidades Críticas para el UI:

POS con Redondeo: El total de la venta debe mostrar un "Redondeo a la Centena Superior" automático (Ej: $1.240 -> $1.300).

Smart Inventory: Tablas que no solo muestren stock, sino un "Sparkline" o mini-gráfico de la evolución del precio de costo del producto.

Bulk Actions: Botonera destacada para importación/exportación de Excel.

Facturación: Botón de estado de conexión con entes fiscales para emisión de comprobantes.

4. Especificaciones de Diseño (UI/UX):

Estilo: "Dark Mode" profesional basado en una paleta de amatistas y lavandas.

Componentes: Uso de Shadcn UI y Tailwind CSS. Layout de panel administrativo con sidebar colapsable.

Paleta de Colores:

Fondo: #2f184b (Dark Amethyst)

Superficies/Cards: #532b88 (Indigo Velvet)

Acciones: #9b72cf (Lavender Purple)

Textos: #f4effa (Lavender Mist)

5. Flujo de Usuario Requerido:
   El usuario debe poder pasar de una búsqueda de producto a una venta finalizada con 3 clics o menos. La interfaz debe priorizar el uso de teclado (shortcuts) para el vendedor.

## Convenciones de Desarrollo (OBLIGATORIAS)

Actuá exclusivamente como desarrollador senior TypeScript dentro de este proyecto. Todo el código que generes DEBE cumplir estrictamente las siguientes reglas. Si una solución viola una regla, NO la propongas. Buscá una alternativa válida.

---

### 🚫 PROHIBICIONES ABSOLUTAS (NO NEGOCIABLES)

No usar bajo ninguna circunstancia:

- `any`
- `typeof`
  - **ÚNICA EXCEPCIÓN:** permitido solo dentro de `zod.preprocess()` para conversión de tipos

- Comparaciones explícitas:
  - `=== null`
  - `=== undefined`
  - `=== true`
  - `=== false`

- Valores hardcodeados

- Comentarios en el código

- Duplicación de lógica existente

- Endpoints anti-REST:
  - `/getAll`
  - `/doSomething`

- Acciones en la URL:
  - ❌ `/users/123/activate`
  - ✅ `PATCH /users/123`

---

### ✅ REGLAS DE TIPADO Y CALIDAD

- **TypeScript estricto**
- **Tipos explícitos y específicos**
- **Nombres descriptivos y semánticos**
  - ❌ `i`, `x`, `temp`, `data`
- **Funciones:**
  - Pequeñas
  - Una sola responsabilidad
  - Aplicar principios SOLID
- **Código:**
  - Mantenible
  - Escalable
  - Legible

---

### 🏛️ PRINCIPIOS SOLID (APLICACIÓN ESTRICTA)

Cada clase o módulo debe cumplir con los 5 principios SOLID:

#### **S - Single Responsibility Principle (SRP)**

Cada clase, función o módulo debe tener una única responsabilidad.

```typescript
// ❌ Incorrecto: Múltiple responsabilidad
class UserService {
  async createUser(data: CreateUserDto) {
    /* ... */
  }
  async sendEmail(user: User) {
    /* ... */
  }
  async generatePDF(user: User) {
    /* ... */
  }
}

// ✅ Correcto: Responsabilidad única
class UserService {
  async createUser(data: CreateUserDto) {
    /* ... */
  }
}

class EmailService {
  async sendEmail(user: User) {
    /* ... */
  }
}

class PDFService {
  async generatePDF(user: User) {
    /* ... */
  }
}
```

#### **O - Open/Closed Principle (OCP)**

Las entidades deben estar abiertas para extensión pero cerradas para modificación.

```typescript
// ✅ Correcto: Extender mediante composición
interface PaymentProcessor {
  process(amount: number): Promise<void>;
}

class CreditCardProcessor implements PaymentProcessor {
  /* ... */
}
class DebitCardProcessor implements PaymentProcessor {
  /* ... */
}
```

#### **L - Liskov Substitution Principle (LSP)**

Las clases derivadas deben poder sustituirse por sus clases base.

```typescript
// ✅ Correcto: Las implementaciones son intercambiables
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<T>;
}

class UserRepository implements Repository<User> {
  /* ... */
}
class ProductRepository implements Repository<Product> {
  /* ... */
}
```

#### **I - Interface Segregation Principle (ISP)**

Los clientes no deben depender de interfaces que no utilizan.

```typescript
// ❌ Incorrecto: Interface muy grande
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

// ✅ Correcto: Interfaces segregadas
interface Workable {
  work(): void;
}

interface Feedable {
  eat(): void;
}

interface Restable {
  sleep(): void;
}
```

#### **D - Dependency Inversion Principle (DIP)**

Depender de abstracciones, no de implementaciones concretas.

```typescript
// ❌ Incorrecto: Dependencia concreta
class OrderService {
  private emailService = new EmailService();
}

// ✅ Correcto: Dependencia de abstracción
interface EmailSender {
  send(to: string, body: string): Promise<void>;
}

class OrderService {
  constructor(private emailSender: EmailSender) {}
}
```

---

### 🏗️ REPOSITORY PATTERN (ARQUITECTURA OBLIGATORIA)

La arquitectura sigue estrictamente el **Repository Pattern** con separación de responsabilidades:

#### **Estructura `/src/server/`**

```
src/server/
├── repository/          # Capa de acceso a datos (DB)
│   ├── user.repository.ts
│   └── product.repository.ts
└── services/            # Capa de lógica de negocio
    ├── user.service.ts
    └── product.service.ts
```

#### **Repository (`/server/repository/`)**

- **Responsabilidad:** Únicamente interacción con la base de datos
- **Operaciones:** CRUD básico sin lógica de negocio
- **Retorno:** Datos crudos de Prisma o `null`
- **Errores:** No lanza errores de negocio, solo errores de DB

```typescript
// ✅ Ejemplo correcto
export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  async create(dto: CreateUserDto) {
    return prisma.user.create({
      data: dto,
    });
  },
};
```

#### **Service (`/server/services/`)**

- **Responsabilidad:** Lógica de negocio, validaciones, reglas
- **Operaciones:** Orquestan repositories, aplican reglas de negocio
- **Errores:** Lanzan `ApiError` con códigos HTTP apropiados
- **Retorno:** Datos procesados listos para el controller/API

```typescript
// ✅ Ejemplo correcto
export const userService = {
  async create(dto: CreateUserDto) {
    const existingUser = await userRepository.findByEmail(dto.email);

    if (existingUser) {
      throw new ApiError({
        status: httpStatus.CONFLICT,
        message: USER_EMAIL_ALREADY_EXISTS,
      });
    }

    return userRepository.create(dto);
  },

  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new ApiError({
        status: httpStatus.NOT_FOUND,
        message: USER_NOT_FOUND,
      });
    }

    return user;
  },
};
```

#### **Reglas de Comunicación entre Capas**

```
API Route → Service → Repository → Prisma → DB
                ↓
           (puede llamar
        múltiples repositories)
```

- **API Route:** Solo recibe petición y llama al service
- **Service:** Puede llamar múltiples repositories
- **Repository:** Solo llama a Prisma, nunca a otro repository

---

### 📐 GESTIÓN DE TIPOS E INTERFACES

#### **Ubicación Obligatoria**

Todos los tipos e interfaces deben almacenarse en:

```
src/types/
├── user.types.ts
├── product.types.ts
└── order.types.ts
```

#### **Extensión de Tipos de Prisma**

Los tipos deben extenderse desde los tipos generados por Prisma para evitar duplicación:

```typescript
// ❌ Incorrecto: Duplicación de tipos
interface User {
  id: string;
  name: string;
  email: string;
}

// ✅ Correcto: Extender desde Prisma
import { User as PrismaUser } from "@prisma/client";

export type User = PrismaUser;

export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}
```

#### **Estructura de Archivos de Tipos**

```typescript
// src/types/user.types.ts
import { User as PrismaUser } from "@prisma/client";

// Tipo base extendido de Prisma
export type User = PrismaUser;

// DTOs para operaciones
export interface CreateUserDto {
  name: string;
  email: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

// Tipos compuestos si son necesarios
export interface UserWithProfile extends User {
  profile: UserProfile | null;
}
```

#### **Reglas para Tipos**

- **Nunca** duplicar tipos que ya existen en Prisma
- **Siempre** usar `extends` o `Partial` para variantes
- **Centralizar** todos los tipos en `/types/`
- **Nombrar** DTOs con sufijo `Dto`: `CreateUserDto`, `UpdateProductDto`
- **Interfaces** para objetos que serán implementados
- **Types** para uniones, intersecciones o aliases
- **Reutilización obligatoria**: Antes de crear un tipo/interfaz, verificar si existe uno reutilizable en `/types/`
- **Prohibido** definir interfaces/types inline en componentes, servicios o controllers
- **Siempre** importar desde `/types/` en lugar de declarar tipos específicos en el lugar de uso

---

### 🎯 CONDICIONALES (OBLIGATORIO)

#### ❌ Prohibido

```typescript
if (value === null)
  if (value === undefined)
    if (flag === true) if (flag === false) value && doSomething();
```

#### ✅ Permitido

```typescript
if (value)
  if (!value)
    if (condition) {
      doSomething();
    }
return condition ? valueA : valueB;
```

**El operador ternario solo está permitido en returns.**

---

### 🌐 HTTP Y MANEJO DE ERRORES

#### Llamadas HTTP

- Usar exclusivamente **axios**

#### Manejo de errores

- **Backend:** `apiError.handler`
- **Frontend:** `clientError.handler`
- Usar códigos HTTP correctos
- No exponer errores crudos

---

### 📦 CONSTANTES (OBLIGATORIO)

Nunca hardcodear:

- Mensajes al usuario
- Límites numéricos
- URLs o rutas
- Textos de UI

#### Ubicación correcta:

- `/constants/*.constant.ts` → reglas de negocio
- `/config/*.ts` → configuración
- Enums de Prisma cuando aplique

---

### 🔗 REST ESTRICTO

#### Verbos correctos:

GET, POST, PUT, PATCH, DELETE

#### Recursos semánticos:

- ✅ `/users/123`
- ❌ `/getUser?id=123`

#### Cambios de estado:

- ❌ `/users/123/activate`
- ✅ `PATCH /users/123`

---

### 🔍 METODOLOGÍA OBLIGATORIA

Antes de escribir código:

1. **Buscar código similar existente**
2. **Reutilizar funciones o componentes**
3. **Extender antes de duplicar**
4. **Mantener coherencia con el proyecto**

**Si algo ya existe, NO lo reimplementes.**

---

### 📋 CHECKLIST PRE-ENTREGA

Antes de responder, validá que:

- [ ] No hay `any` ni `typeof` (excepto Zod)
- [ ] No hay comparaciones explícitas
- [ ] No hay valores hardcodeados
- [ ] No hay comentarios
- [ ] Las constantes están centralizadas
- [ ] Los nombres son descriptivos
- [ ] Los errores están manejados correctamente
- [ ] El diseño es REST compliant
- [ ] El código es reutilizable
- [ ] Los principios SOLID están aplicados
- [ ] Repository Pattern está implementado correctamente
- [ ] Los tipos están extendidos desde Prisma en `/types/`

---

### ⚠️ COMPORTAMIENTO ESPERADO

- No expliques reglas
- No justifiques malas prácticas
- No propongas soluciones "más simples" si rompen reglas
- Si una solicitud del usuario viola las reglas, adaptala correctamente

**Tu objetivo es producir código listo para producción, alineado con un proyecto profesional de alto estándar.**

---

## Arquitectura Técnica

### Stack Tecnológico Común

- **Framework:** Next.js
- **Lenguaje:** TypeScript (estricto)
- **ORM:** Prisma
- **Validación:** Zod
- **HTTP Client:** Axios
- **Estilos:** Tailwind CSS + shadcn/ui
- **Package Manager:** pnpm

### Estructura de Carpetas (por app)

```
apps/<project>/
├── prisma/
│   └── schema.prisma
├── public/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Componentes React
│   ├── constants/        # Constantes de negocio
│   ├── config/           # Configuración
│   ├── lib/              # Utilidades y configuración (prisma, axios)
│   ├── server/           # Capa backend (Repository Pattern)
│   │   ├── repository/   # Acceso a datos (DB interaction)
│   │   └── services/     # Lógica de negocio
│   ├── services/         # Servicios externos (HTTP calls)
│   ├── types/            # Tipos e interfaces (extendidos de Prisma)
│   └── utils/            # Funciones utilitarias y handlers
├── .env.example
├── next.config.ts
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

### Convenciones de Nomenclatura

- **Archivos:** `kebab-case.ts` para utilidades, `PascalCase.tsx` para componentes
- **Constantes:** `UPPER_SNAKE_CASE`
- **Funciones:** `camelCase`
- **Componentes:** `PascalCase`
- **Tipos:** `PascalCase`

### Base de Datos

- Cada proyecto tiene su propia base de datos
- Prisma schema en `prisma/schema.prisma`
- Migraciones gestionadas por Prisma Migrate

---

## Metodología de Trabajo

El desarrollo se realiza bajo una modalidad **ágil e incremental**, garantizando transparencia y fluidez en el avance del proyecto.

- **Entregas progresivas y funcionales** a lo largo de todo el proceso
- **Retroalimentación continua** con el cliente
- **Pruebas tempranas** en entorno seguro
- **Arquitectura 100% escalable** para futuros módulos

---

## Instrucciones de Uso

Este archivo sirve como **prompt de contexto** para cualquier sesión de desarrollo en estos proyectos. Al iniciar una nueva tarea:

1. **Referenciar este archivo** para entender el contexto completo
2. **Identificar la app objetivo** (rg, migra, o vendedores)
3. **Aplicar todas las convenciones** listadas en este documento
4. **Buscar código existente** antes de implementar
5. **Mantener coherencia** con la arquitectura establecida

---

**Proveedor:** Matías Ramón Ahumada (D.N.I: 42.499.732)

**Fecha de creación:** 1 de abril de 2026

**Última actualización:** 1 de abril de 2026

---

name: Technical Precision System
colors:
surface: '#fff7ff'
surface-dim: '#e8d1ff'
surface-bright: '#fff7ff'
surface-container-lowest: '#ffffff'
surface-container-low: '#fbf0ff'
surface-container: '#f6e9ff'
surface-container-high: '#f2e2ff'
surface-container-highest: '#eedbff'
on-surface: '#260e42'
on-surface-variant: '#4a4451'
inverse-surface: '#3c2558'
inverse-on-surface: '#f8edff'
outline: '#7c7482'
outline-variant: '#cdc3d2'
surface-tint: '#714aa8'
primary: '#3c0e71'
on-primary: '#ffffff'
primary-container: '#532b88'
on-primary-container: '#c49afe'
inverse-primary: '#d8baff'
secondary: '#724aa4'
on-secondary: '#ffffff'
secondary-container: '#c89dfe'
on-secondary-container: '#562e87'
tertiary: '#34234c'
on-tertiary: '#ffffff'
tertiary-container: '#4b3964'
on-tertiary-container: '#bba4d7'
error: '#ba1a1a'
on-error: '#ffffff'
error-container: '#ffdad6'
on-error-container: '#93000a'
primary-fixed: '#eddcff'
primary-fixed-dim: '#d8baff'
on-primary-fixed: '#290055'
on-primary-fixed-variant: '#59318e'
secondary-fixed: '#eedcff'
secondary-fixed-dim: '#d9b9ff'
on-secondary-fixed: '#2a0054'
on-secondary-fixed-variant: '#59328b'
tertiary-fixed: '#eddcff'
tertiary-fixed-dim: '#d4bdf1'
on-tertiary-fixed: '#24123b'
on-tertiary-fixed-variant: '#513e6a'
background: '#fff7ff'
on-background: '#260e42'
surface-variant: '#eedbff'
typography:
h1:
fontFamily: Inter
fontSize: 36px
fontWeight: '700'
lineHeight: '1.2'
letterSpacing: -0.02em
h2:
fontFamily: Inter
fontSize: 30px
fontWeight: '600'
lineHeight: '1.3'
letterSpacing: -0.01em
h3:
fontFamily: Inter
fontSize: 24px
fontWeight: '600'
lineHeight: '1.4'
letterSpacing: 0em
body-lg:
fontFamily: Inter
fontSize: 18px
fontWeight: '400'
lineHeight: '1.6'
letterSpacing: 0em
body-md:
fontFamily: Inter
fontSize: 16px
fontWeight: '400'
lineHeight: '1.5'
letterSpacing: 0em
body-sm:
fontFamily: Inter
fontSize: 14px
fontWeight: '400'
lineHeight: '1.5'
letterSpacing: 0em
label-md:
fontFamily: Inter
fontSize: 14px
fontWeight: '600'
lineHeight: '1'
letterSpacing: 0.02em
label-sm:
fontFamily: Inter
fontSize: 12px
fontWeight: '500'
lineHeight: '1'
letterSpacing: 0.05em
code:
fontFamily: Inter
fontSize: 14px
fontWeight: '400'
lineHeight: '1.4'
letterSpacing: 0em
rounded:
sm: 0.25rem
DEFAULT: 0.5rem
md: 0.75rem
lg: 1rem
xl: 1.5rem
full: 9999px
spacing:
base: 4px
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
2xl: 48px
3xl: 64px

---

## Brand & Style

The design system is engineered for **GRUPO ZULIM S.R.L** to reflect operational excellence, technical rigor, and industrial reliability. As an integral sales and stock management tool, the visual language prioritizes data density and clarity without sacrificing aesthetic sophistication.

The style is a hybrid of **Minimalism** and **Modern Corporate**, utilizing a high-utility approach where every element serves a functional purpose. By leveraging a palette of cool amethysts and lavender mists, the UI moves away from generic "SaaS blue" toward a distinctive, premium identity that feels both professional and contemporary. The interface aims to evoke a sense of organized calm, even when handling complex inventory datasets.

## Colors

The color architecture is built on a sophisticated purple scale, ranging from deep "Dark Amethyst" for text to ethereal "Lavender Mist" for spatial definition.

- **Primary Canvas:** Use `#fdfcfe` (900) for global app backgrounds and `#f4effa` (500) for structural division such as sidebar containers or secondary panels.
- **Action Tier:** The primary interactive color is `#532b88` (Indigo Velvet). Use `#9b72cf` exclusively for hover states to provide a luminous, high-energy feedback loop.
- **Utility Tier:** Use `#c8b1e4` (Wisteria) for non-destructive emphasis, such as active navigation states and subtle component borders.
- **Content Tier:** All typography and iconography leverage `#2f184b` to maintain maximum legibility and a grounded, professional weight.

## Typography

This design system utilizes **Inter** for all interface levels to ensure a systematic and utilitarian feel. The hierarchy is optimized for data-heavy stock management, where scanning efficiency is paramount.

- **Headlines:** Use Bold and Semi-Bold weights with slight negative letter spacing to create a compact, authoritative presence in dashboard headers.
- **Body Text:** Standardized at 16px for general content and 14px for internal table data or sidebars to maintain information density.
- **Labels:** Use Medium and Semi-Bold weights in all-caps or sentence case for form field headers and status indicators to differentiate them from interactive data.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** approach for the main dashboard views and a **Fixed Grid** for administrative forms and settings modals.

- **Grid System:** A 12-column responsive grid with 24px (lg) gutters.
- **Rhythm:** An 8px linear scale (base-2) governs all padding and margins.
- **Application:** Use 16px (md) for internal card padding and 24px (lg) for global page margins to maintain a professional sense of whitespace that prevents the technical data from feeling overwhelming.

## Elevation & Depth

Visual hierarchy in this design system is achieved through **low-contrast outlines** and **tonal layering** rather than aggressive shadows.

- **Surfaces:** All primary cards and data containers are pure white (#ffffff).
- **Borders:** Instead of heavy shadows, depth is defined by 1px solid borders in `#c8b1e4` (Wisteria 500). This provides a technical, blueprint-like aesthetic.
- **Shadows:** Use a single, subtle "shadow-sm" (0 1px 2px 0 rgba(47, 24, 75, 0.05)) only for floating elements like dropdown menus or active dialogs.
- **Layering:** The use of `#f4effa` as a background for sidebars and secondary navigation drawers creates a clear distinction between "navigation" and "work surface."

## Shapes

The design system employs a consistent **Rounded** shape language to soften the technical nature of the software.

- **Global Radius:** A standard 0.5rem (8px) radius is applied to all buttons, input fields, and cards (`rounded-lg` in Tailwind).
- **Interactive Elements:** Buttons and input fields should strictly adhere to this radius to maintain a cohesive component library.
- **Large Containers:** For main content areas or large modal containers, use 1rem (16px) to emphasize the "surface" nature of the component.

## Components

Components within the design system prioritize clarity and ease of use for repetitive tasks.

- **Buttons:** Primary buttons use `#532b88` background with white text. Hover states transition to `#9b72cf`. Secondary buttons use a transparent background with a `#c8b1e4` border and `#2f184b` text.
- **Input Fields:** Pure white background, 1px border in `#c8b1e4`. On focus, the border thickens or darkens to `#532b88`.
- **Active Sidebar States:** Items use a background of `#c8b1e4` with typography in `#2f184b` to signify selection without the harshness of a primary-color fill.
- **Cards:** White surfaces, subtle `#c8b1e4` borders, and the "shadow-sm" treatment for a lifted effect.
- **Chips/Badges:** Use light tints of the primary colors (e.g., `#f4effa`) with `#2f184b` text for status tags like "In Stock" or "Pending."
- **Data Tables:** High-density rows with `#f4effa` alternating zebra-striping or thin `#c8b1e4` horizontal dividers. Header text should be `label-sm` in `#2f184b`.
