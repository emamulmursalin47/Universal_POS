// utils/getUserRole.ts
import { jwtDecode } from 'jwt-decode';

interface TokenPayload {
  _id: string;
  userId: string;
  storeName: string;
  email: string;
  role: "superadmin" | "vendor" | "cashier";
  iat: number;
  exp: number;
}

export function getUserRole(): TokenPayload["role"] | null {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded.role;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}
