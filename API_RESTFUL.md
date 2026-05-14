# API RESTful - Productos

## Endpoint: `/api/products`

### POST - Crear Producto(s)

Este endpoint maneja tanto la creación unitaria como la importación masiva de productos.

#### Creación Unitaria

**Request:**

```http
POST /api/products
Content-Type: application/json

{
  "name": "Producto Ejemplo",
  "sku": "PROD001",
  "categoryId": "uuid",
  "unitType": "UNIT",
  "pricePerPiece": 1000,
  "costPrice": 500,
  ...
}
```

**Response:**

```json
{
  "id": "uuid",
  "name": "Producto Ejemplo",
  "sku": "PROD001",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Status Codes:**

- `201 Created` - Producto creado exitosamente
- `400 Bad Request` - Datos inválidos
- `409 Conflict` - SKU duplicado

---

#### Importación Masiva (Bulk)

**Request:**

```http
POST /api/products
Content-Type: multipart/form-data

file: [archivo.xlsx]
```

**Response:**

```json
{
  "success": true,
  "imported": 150,
  "failed": 5,
  "errors": [
    {
      "row": 10,
      "field": "sku",
      "message": "SKU duplicado: PROD001"
    }
  ]
}
```

**Status Codes:**

- `201 Created` - Importación exitosa
- `400 Bad Request` - Archivo inválido o errores de validación
- `415 Unsupported Media Type` - Content-Type no soportado

---

### GET - Listar Productos

```http
GET /api/products?page=1&limit=20&search=termo
```

**Response:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "totalPages": 8
  }
}
```

---

### GET - Obtener Producto por ID

```http
GET /api/products/[id]
```

**Response:**

```json
{
  "id": "uuid",
  "name": "Producto",
  "sku": "PROD001",
  "category": {
    "id": "uuid",
    "name": "Categoría"
  },
  "brand": {
    "id": "uuid",
    "name": "Marca"
  }
}
```

---

### PUT - Actualizar Producto

```http
PUT /api/products/[id]
Content-Type: application/json

{
  "name": "Producto Actualizado",
  "pricePerPiece": 1200
}
```

---

### DELETE - Eliminar Producto

```http
DELETE /api/products/[id]
```

**Response:**

```json
{
  "message": "Producto eliminado exitosamente"
}
```

---

## Principios RESTful Aplicados

✅ **Recursos como sustantivos**: `/products` (no `/getProducts` o `/createProduct`)
✅ **Verbos HTTP correctos**: GET, POST, PUT, DELETE
✅ **Content-Type negociation**: Detecta JSON vs FormData
✅ **Status codes apropiados**: 200, 201, 400, 404, 409, 415
✅ **Respuestas consistentes**: Siempre JSON con estructura predecible
✅ **Idempotencia**: PUT y DELETE son idempotentes
✅ **Sin acciones en URL**: No `/products/activate` sino `PATCH /products/[id]`

---

## Estructura de Directorios

```
src/app/api/
├── products/
│   ├── route.ts          # POST (bulk/single), GET (list)
│   └── [id]/
│       └── route.ts      # GET, PUT, DELETE (single)
├── suppliers/
│   ├── route.ts
│   └── [id]/
│       └── route.ts
└── brands/
    ├── route.ts
    └── [id]/
        └── route.ts
```
