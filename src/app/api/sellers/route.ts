import { NextRequest, NextResponse } from "next/server";
import { sellerService } from "@/server/services/seller.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { SELLER_MESSAGES } from "@/constants/seller.constant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;

    const sellers = await sellerService.findMany({ search });

    return NextResponse.json(sellers, { status: httpStatus.OK });
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

    const seller = await sellerService.create(body);

    return NextResponse.json(
      { data: seller, message: SELLER_MESSAGES.CREATE_SUCCESS },
      { status: httpStatus.CREATED }
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
