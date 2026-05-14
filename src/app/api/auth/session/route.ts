import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import httpStatus from "http-status";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { status: httpStatus.OK },
      );
    }

    const user = await authService.validateToken(token);

    if (!user) {
      return NextResponse.json(
        { user: null, isAuthenticated: false },
        { status: httpStatus.OK },
      );
    }

    return NextResponse.json(
      { user, isAuthenticated: true },
      { status: httpStatus.OK },
    );
  } catch {
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { status: httpStatus.OK },
    );
  }
}
