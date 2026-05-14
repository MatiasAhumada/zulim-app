# Reglas de Pricing - ZULIM ERP

## 📊 Multiplicadores de Precio

### Multiplicadores FIJOS (Todos los productos)

```typescript
wholesalePrice = 1.7; // Precio mayorista (6+ unidades)
maxDiscountPrice = 1.5; // Precio con máximo descuento (10+ unidades)
```

### Multiplicadores VARIABLES (Por proveedor)

```typescript
pricePerMeter = 3.1; // Varía según proveedor
pricePerPiece = 2.1; // Varía según proveedor
factoryDiscount = 0.9; // Varía por producto (descuento de fábrica)
```

## 🧮 Fórmulas de Cálculo

### Base de Cálculo

```typescript
basePrice = costo * descuentoProducto * IVA;
```

### Precios Finales (Redondeados)

```typescript
pricePerMeter = Math.round(
  (basePrice * pricePerMeterMultiplier) / cantidadMetros,
);
pricePerPiece = Math.round(basePrice * pricePerPieceMultiplier);
wholesalePrice = Math.round(basePrice * 1.7); // FIJO
maxDiscountPrice = Math.round(basePrice * 1.5); // FIJO
factoryDiscountPrice = Math.round(costo * descuentoProducto);
```

## 📋 Ejemplo Completo

### Datos de Entrada

```
Costo: 3000
Cantidad por pieza: 10 metros
Descuento producto: 0.9 (10% descuento)
IVA: 1.21 (21%)

Multiplicadores del proveedor:
- pricePerMeter: 3.1
- pricePerPiece: 2.1

Multiplicadores fijos:
- wholesalePrice: 1.7
- maxDiscountPrice: 1.5
```

### Cálculo

```typescript
basePrice = 3000 * 0.9 * 1.21 = 3267

pricePerMeter = Math.round((3267 * 3.1) / 10) = 1013
pricePerPiece = Math.round(3267 * 2.1) = 6861
wholesalePrice = Math.round(3267 * 1.7) = 5554
maxDiscountPrice = Math.round(3267 * 1.5) = 4901
factoryDiscountPrice = Math.round(3000 * 0.9) = 2700
```

## 📄 Estructura del Excel

### Fila 1: Multiplicadores Variables del Proveedor

```
3,751  2,541  [ignorado]  [ignorado]  0,9
  ↓      ↓                              ↓
xmtr   xpza                    descuento global
```

**Nota:** Las posiciones 3 y 4 (1.7 y 1.5) se ignoran porque son valores fijos del sistema.

### Fila 2: Marca y Reglas de Cantidad

```
CORDÓN DE ORO  16/12/2025  6 o+  10 o+
```

### Fila 3+: Productos con Descuentos Específicos

```
(fila en blanco)
0,66  ← Descuento específico para este producto (34%)
35-  Raso doble Faz  cant  xmtr  xpza  xmay  MAX  c/el dscto  costo
1948  0 (3mm)  50  200  8000  5700  5030  2752,2  4170
1948  1 (6mm)  10  300  2500  1800  1600  877,8  1330
```

## 🎯 Prioridad de Descuentos

1. **Descuento por Producto** (0.66, 0.9, etc.) - Específico para cada grupo de variantes
2. **Descuento Global** (primera fila) - Si no hay descuento específico

## 💾 Almacenamiento en Base de Datos

### Tabla: PricingRule

```sql
-- Multiplicadores variables por proveedor
pricePerMeterMultiplier: 3.1
pricePerPieceMultiplier: 2.1

-- Multiplicadores fijos (siempre iguales)
wholesalePriceMultiplier: 1.7
maxDiscountPriceMultiplier: 1.5

-- Descuento de fábrica (puede variar)
factoryDiscountMultiplier: 0.9

-- IVA
taxRate: 1.21
```

## 🔄 Flujo de Aplicación

```
1. Lee multiplicadores variables de primera fila (3.1, 2.1)
2. Usa multiplicadores fijos del sistema (1.7, 1.5)
3. Por cada producto:
   a. Lee descuento específico (0.66, 0.9, etc.)
   b. Calcula basePrice = costo * descuento * IVA
   c. Aplica multiplicadores variables (3.1, 2.1)
   d. Aplica multiplicadores fijos (1.7, 1.5)
   e. Redondea todos los resultados
```

## ⚠️ Importante

- **1.7 y 1.5 son SIEMPRE fijos** para todos los productos y proveedores
- **3.1, 2.4, 2.1 varían** según el proveedor
- Los descuentos (0.9, 0.66) pueden ser globales o por producto
- Todos los precios se redondean con `Math.round()`
