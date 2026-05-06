import { NextRequest, NextResponse } from "next/server";
import { sellerService } from "@/server/services/seller.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { SELLER_MESSAGES } from "@/constants/seller.constant";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const seller = await sellerService.findById(id);

    return NextResponse.json(seller, { status: httpStatus.OK });
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

    const seller = await sellerService.update(id, body);

    return NextResponse.json(
      { data: seller, message: SELLER_MESSAGES.UPDATE_SUCCESS },
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

    await sellerService.delete(id);

    return NextResponse.json(
      { message: SELLER_MESSAGES.DELETE_SUCCESS },
      { status: httpStatus.OK }
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
