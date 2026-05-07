import { NextRequest, NextResponse } from "next/server";
import { saleService } from "@/server/services/sale.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { SALE_MESSAGES } from "@/constants/sale.constant";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const sale = await saleService.findById(id);

    return NextResponse.json(sale, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await saleService.delete(id);

    return NextResponse.json(
      { message: SALE_MESSAGES.DELETE_SUCCESS },
      { status: httpStatus.OK },
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
