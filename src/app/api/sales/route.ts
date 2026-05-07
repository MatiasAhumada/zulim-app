import { NextRequest, NextResponse } from "next/server";
import { saleService } from "@/server/services/sale.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { SALE_MESSAGES } from "@/constants/sale.constant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;

    const sales = await saleService.findMany({ search });

    return NextResponse.json(sales, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const sale = await saleService.create(body);

    return NextResponse.json(
      { data: sale, message: SALE_MESSAGES.CREATE_SUCCESS },
      { status: httpStatus.CREATED },
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
