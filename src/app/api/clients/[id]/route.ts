import { NextRequest, NextResponse } from "next/server";
import { clientService } from "@/server/services/client.service";
import apiErrorHandler, { ApiError } from "@/utils/handlers/apiError.handler";
import httpStatus from "http-status";
import { CLIENT_MESSAGES } from "@/constants/client.constant";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const client = await clientService.findById(id);

    return NextResponse.json(client, { status: httpStatus.OK });
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

    const client = await clientService.update(id, body);

    return NextResponse.json(
      { data: client, message: CLIENT_MESSAGES.UPDATE_SUCCESS },
      { status: httpStatus.OK },
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

    await clientService.delete(id);

    return NextResponse.json(
      { message: CLIENT_MESSAGES.DELETE_SUCCESS },
      { status: httpStatus.OK },
    );
  } catch (error) {
    return apiErrorHandler({
      error: error as ApiError,
      request,
    });
  }
}
