import { jwtDecode } from "jwt-decode";

interface JWTPayload {
    tenant: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

export const decodeToken = (token: string): JWTPayload | null => {
    try {
        return jwtDecode<JWTPayload>(token); 
    } catch {
        return null
    }
}