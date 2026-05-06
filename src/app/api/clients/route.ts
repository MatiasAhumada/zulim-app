import { NextRequest, NextResponse } from "next/server";
import { clientService } from "@/server/services/client.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { CLIENT_MESSAGES } from "@/constants/client.constant";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? undefined;

    const clients = await clientService.findMany({ search });

    return NextResponse.json(clients, { status: httpStatus.OK });
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

    const client = await clientService.create(body);

    return NextResponse.json(
      { data: client, message: CLIENT_MESSAGES.CREATE_SUCCESS },
      { status: httpStatus.CREATED },
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
