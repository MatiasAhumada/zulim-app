import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/server/services/product.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { PRODUCT_MESSAGES } from "@/constants/product.constant";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const product = await productService.findById(id);

    return NextResponse.json(product, { status: httpStatus.OK });
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const product = await productService.update(id, body);

    return NextResponse.json(
      { data: product, message: PRODUCT_MESSAGES.UPDATE_SUCCESS },
      { status: httpStatus.OK }
    );
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

    await productService.delete(id);

    return NextResponse.json(
      { message: PRODUCT_MESSAGES.DELETE_SUCCESS },
      { status: httpStatus.OK }
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
