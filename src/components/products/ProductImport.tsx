"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { clientErrorHandler } from "@/utils/handlers/clientError.handler";
import {
  Upload01Icon,
  FileDownloadIcon,
  CheckmarkCircle02Icon,
  AlertCircleIcon,
} from "hugeicons-react";
import type { ImportResult } from "@/types/import.types";

export function ProductImport() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error("Selecciona un archivo");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setResult(data);
        toast.error(`Importación fallida: ${data.failed} errores`);
        return;
      }

      setResult(data);
      toast.success(`${data.imported} productos importados correctamente`);
      setFile(null);
    } catch (error) {
      clientErrorHandler(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "nombre",
      "codigo",
      "descripcion",
      "unidad",
      "cantidad_minima",
      "cantidad_maxima",
      "precio_compra",
      "margen",
      "precio_minorista",
      "precio_mayorista",
      "precio_venta",
      "stock",
    ];

    const example = [
      "Producto Ejemplo",
      "PROD001",
      "Descripción del producto",
      "UNIT",
      "1",
      "100",
      "1000",
      "30",
      "1300",
      "1200",
      "1300",
      "50",
    ];

    const csv = [headers.join(","), example.join(",")].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "plantilla_productos.csv";
    a.click();
    URL.revokeObjectURL(url);

    toast.success(
      "Recuerda: Cada hoja del Excel debe tener el nombre del proveedor",
    );
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Importar Productos</h2>
            <Button variant="outline" onClick={downloadTemplate}>
              <FileDownloadIcon className="mr-2 h-4 w-4" />
              Descargar Plantilla
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">Archivo Excel o CSV</Label>
            <Input
              id="file"
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Formatos soportados: .xlsx, .xls, .csv (máximo 5MB)
            </p>
            <p className="text-sm font-medium text-purple-600">
              📌 Importante: Cada hoja del Excel debe tener el nombre del
              proveedor
            </p>
          </div>

          <Button
            onClick={handleImport}
            disabled={!file || loading}
            className="w-full"
          >
            <Upload01Icon className="mr-2 h-4 w-4" />
            {loading ? "Importando..." : "Importar Productos"}
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {result.success ? (
                <CheckmarkCircle02Icon className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircleIcon className="h-6 w-6 text-red-500" />
              )}
              <h3 className="text-xl font-semibold">
                {result.success
                  ? "Importación Exitosa"
                  : "Importación con Errores"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-green-50 p-4">
                <p className="text-sm text-green-600">Importados</p>
                <p className="text-2xl font-bold text-green-700">
                  {result.imported}
                </p>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-600">Fallidos</p>
                <p className="text-2xl font-bold text-red-700">
                  {result.failed}
                </p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold">Errores Detectados:</h4>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {result.errors.map((error, index) => (
                    <div
                      key={index}
                      className="rounded-lg bg-red-50 p-3 text-sm"
                    >
                      <p className="font-medium text-red-700">
                        Fila {error.row}: {error.message}
                      </p>
                      {error.field && (
                        <p className="text-red-600">Campo: {error.field}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
