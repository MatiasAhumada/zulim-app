import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/server/services/auth.service";
import httpStatus from "http-status";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, password } = body;

    if (action === "login") {
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email y password son requeridos" },
          { status: httpStatus.BAD_REQUEST },
        );
      }

      const user = await authService.login({ email, password });

      const token = btoa(JSON.stringify(user));

      const response = NextResponse.json(
        { user, message: "Login exitoso" },
        { status: httpStatus.OK },
      );

      response.cookies.set("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });

      return response;
    }

    if (action === "logout") {
      const response = NextResponse.json(
        { message: "Logout exitoso" },
        { status: httpStatus.OK },
      );

      response.cookies.set("auth-token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Acción no válida" },
      { status: httpStatus.BAD_REQUEST },
    );
  } catch (error) {
    const err = error as Error & { statusCode?: number };
    return NextResponse.json(
      { error: err.message || "Error interno del servidor" },
      { status: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR },
    );
  }
}
