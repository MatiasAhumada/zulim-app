import { userRepository } from "@/server/repository/user.repository";
import { User, Role } from "@prisma/client";
import httpStatus from "http-status";

interface LoginDto {
  email: string;
  password: string;
}

interface AuthPayload {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface SessionResponse {
  user: AuthPayload | null;
  isAuthenticated: boolean;
}

const INVALID_CREDENTIALS = "Credenciales inválidas";

export const authService = {
  async login({ email, password }: LoginDto): Promise<AuthPayload> {
    const user = await userRepository.findByEmail({ email });

    if (!user) {
      const error = new Error(INVALID_CREDENTIALS) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }

    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      const error = new Error(INVALID_CREDENTIALS) as Error & {
        statusCode: number;
      };
      error.statusCode = httpStatus.UNAUTHORIZED;
      throw error;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  },

  async getSession(userId: string): Promise<SessionResponse> {
    const user = await userRepository.findById(userId);

    if (!user) {
      return {
        user: null,
        isAuthenticated: false,
      };
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      isAuthenticated: true,
    };
  },

  async validateToken(token: string): Promise<AuthPayload | null> {
    try {
      const payload = JSON.parse(atob(token)) as AuthPayload;
      const user = await userRepository.findById(payload.id);

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } catch {
      return null;
    }
  },
};

export type AuthService = typeof authService;
