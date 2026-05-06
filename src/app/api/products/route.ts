import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/server/services/product.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { PRODUCT_MESSAGES } from "@/constants/product.constant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;

    const products = await productService.findMany({ search });

    return NextResponse.json(products, { status: httpStatus.OK });
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

    const product = await productService.create(body);

    return NextResponse.json(
      { data: product, message: PRODUCT_MESSAGES.CREATE_SUCCESS },
      { status: httpStatus.CREATED }
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
