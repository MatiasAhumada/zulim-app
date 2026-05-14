# Sistema de Parsers Modular por Marca

## 📁 Estructura

```
src/utils/parsers/
├── base.parser.ts          # Clase base abstracta
├── abrafic.parser.ts       # Parser específico de ABRAFIC
├── parser.factory.ts       # Factory para obtener parser correcto
└── [nueva-marca].parser.ts # Nuevos parsers aquí
```

## 🎯 Arquitectura

### 1. Base Parser (Abstracto)

Define la interfaz común que todos los parsers deben implementar:

```typescript
interface BrandParser {
  isBrandRow(row): boolean;
  isCategoryRow(row, context): boolean;
  isVariantRow(row, context): boolean;
  extractBrandName(row): string;
  extractCategoryName(row): string;
  extractBusinessRules(row): BusinessRules;
  parseVariantRow(row, context): ProductImportRow | ImportError;
}
```

### 2. Parser Específico (ABRAFIC)

Implementa la lógica específica de cada marca:

```typescript
export class AbraficParser extends BaseBrandParser {
  // Detecta fila de marca: "CORDÓN DE ORO  1/4  16/12/2025  6 o+  10 o+"
  isBrandRow(row) { ... }

  // Detecta fila de categoría: "Art  Estampadas  cant  xmtr..."
  isCategoryRow(row, context) { ... }

  // Detecta fila de variante: "1948  Raso Rojo  50  200..."
  isVariantRow(row, context) { ... }

  // Parsea datos específicos de ABRAFIC
  parseVariantRow(row, context) { ... }
}
```

### 3. Factory

Retorna el parser correcto según la marca:

```typescript
export function getBrandParser(brandName: string): BrandParser {
  switch (normalized) {
    case "ABRAFIC":
      return new AbraficParser();
    case "NUEVA_MARCA":
      return new NuevaMarcaParser();
    default:
      return new AbraficParser();
  }
}
```

## ➕ Agregar Nueva Marca

### Paso 1: Crear Parser Específico

```typescript
// src/utils/parsers/nueva-marca.parser.ts
import { BaseBrandParser, type SheetContext } from "./base.parser";

export class NuevaMarcaParser extends BaseBrandParser {
  isBrandRow(row: Record<string, unknown>): boolean {
    // Lógica específica para detectar marca
    // Ejemplo: buscar palabra clave, formato específico, etc.
  }

  isCategoryRow(row: Record<string, unknown>, context: SheetContext): boolean {
    // Lógica para detectar categoría
  }

  isVariantRow(row: Record<string, unknown>, context: SheetContext): boolean {
    // Lógica para detectar variante
  }

  extractBrandName(row: Record<string, unknown>): string {
    // Extraer nombre de marca del row
  }

  extractCategoryName(row: Record<string, unknown>): string {
    // Extraer nombre de categoría
  }

  extractBusinessRules(row: Record<string, unknown>) {
    // Extraer reglas de negocio (cantidades mínimas, etc.)
    return {
      wholesaleMinQty: null,
      maxDiscountMinQty: null,
    };
  }

  parseVariantRow(
    row: Record<string, unknown>,
    rowIndex: number,
    context: SheetContext,
    supplierName: string,
  ) {
    // Parsear datos de la variante usando config
    const config = context.brandConfig || getDefaultBrandConfig();

    const sku = String(this.getColumnValue(row, "sku", config) || "");
    // ... extraer todos los campos

    return productImportSchema.safeParse(productData);
  }
}
```

### Paso 2: Configurar Marca

```typescript
// src/constants/brand-config.constant.ts
export const BRAND_CONFIGS: Record<string, BrandConfig> = {
  NUEVA_MARCA: {
    name: "NUEVA_MARCA",
    columnMapping: {
      sku: "codigo",
      categoryName: "producto",
      quantityPerPiece: "cantidad",
      // ... mapeo específico
    },
    hasVariants: true,
    priceStructure: {
      hasPurchasePrice: true,
      // ... estructura de precios
    },
  },
};
```

### Paso 3: Registrar en Factory

```typescript
// src/utils/parsers/parser.factory.ts
export function getBrandParser(brandName: string): BrandParser {
  const normalized = brandName.toUpperCase().trim();

  switch (normalized) {
    case "ABRAFIC":
      return new AbraficParser();

    case "NUEVA_MARCA":
      return new NuevaMarcaParser();

    default:
      return new AbraficParser();
  }
}
```

## 🔄 Flujo de Procesamiento

```
1. ProductImportParser.parseFileBySheets()
   ↓
2. Por cada fila del Excel:
   ↓
3. getBrandParser(brandName) → Obtiene parser específico
   ↓
4. brandParser.isBrandRow() → ¿Es fila de marca?
   ↓
5. brandParser.isCategoryRow() → ¿Es fila de categoría?
   ↓
6. brandParser.isVariantRow() → ¿Es fila de variante?
   ↓
7. brandParser.parseVariantRow() → Parsea datos
   ↓
8. Valida con Zod schema
   ↓
9. Retorna ProductImportRow o ImportError
```

## 🎨 Ventajas del Sistema Modular

✅ **Separación de responsabilidades** - Cada marca tiene su parser
✅ **Fácil extensión** - Agregar nueva marca sin tocar código existente
✅ **Reutilización** - Métodos comunes en BaseBrandParser
✅ **Testeable** - Cada parser se puede testear independientemente
✅ **Mantenible** - Cambios en una marca no afectan otras
✅ **Type-safe** - TypeScript garantiza implementación correcta

## 📝 Ejemplo: Diferencias entre Marcas

### ABRAFIC

- Fila marca: "CORDÓN DE ORO 1/4 16/12/2025 6 o+ 10 o+"
- Fila categoría: "Art Estampadas cant xmtr..."
- Tiene reglas de negocio en fila de marca
- Columnas: art, cant, xmtr, xpza, xmay, MAX, c/el dscto, costo

### Hipotética Marca B

- Fila marca: "MARCA B - Catálogo 2025"
- Fila categoría: "Código | Descripción | Stock | Precio"
- Sin reglas de negocio
- Columnas: codigo, descripcion, stock, precio_venta, precio_costo

Cada una tiene su parser específico que maneja estas diferencias.
