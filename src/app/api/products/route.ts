import { NextRequest, NextResponse } from "next/server";
import { ProductImportService } from "@/server/services/product-import.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type");

    if (contentType?.includes("multipart/form-data")) {
      return await handleBulkImport(request);
    }

    if (contentType?.includes("application/json")) {
      return await handleSingleCreation(request);
    }

    return NextResponse.json(
      {
        error:
          "Content-Type no soportado. Use multipart/form-data para bulk o application/json para creación unitaria",
      },
      { status: 415 },
    );
  } catch (error) {
    const apiError =
      error instanceof ApiError
        ? error
        : new ApiError({
            status: httpStatus.INTERNAL_SERVER_ERROR,
            message:
              error instanceof Error ? error.message : "Error desconocido",
          });
    return apiErrorHandler({ error: apiError, request });
  }
}

async function handleBulkImport(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json(
      { error: "No se proporcionó ningún archivo" },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const service = new ProductImportService();
  const result = await service.importFromFile(buffer);

  if (!result.success) {
    return NextResponse.json(result, { status: 400 });
  }

  return NextResponse.json(result, { status: 201 });
}

async function handleSingleCreation(request: NextRequest) {
  const body = await request.json();

  return NextResponse.json(
    { message: "Creación unitaria de productos - Por implementar", data: body },
    { status: 501 },
  );
}
