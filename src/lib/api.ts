import axios from "axios"
import type { AxiosRequestConfig  } from "axios"

// ============================================
// CREACION DE UNA INSTANCIA DE AXIOS CON CONFIGURACION BASE
export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});
// ============================================

// ============================================
// INVERSION DE CONTROL PARA MANEJO DE AUTENTICACION
export type AuthManager = {
    getToken: () => string | null;
    refreshToken?: () => Promise<string | null>;
    logout?: () => void;
}

let authManager: AuthManager | null = null

export const setAuthManager = (manager: AuthManager) => {
    authManager = manager;
};

export const clearAuthManager = () => {
    authManager = null;
}
// ============================================

// ============================================
// INTERCEPTOR DE PETICIONES PARA INCLUIR TOKEN DE
// AUTENTICACION EN CADA PETICION
api.interceptors.request.use(
    (config) => {
        const token = authManager?.getToken();
        
        if (token) {
            config.headers = config.headers ?? {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// ============================================

// ============================================
// INTERCEPTOR DE RESPUESTAS PARA MANEJO DE ERRORES DE 
// AUTENTICACION Y REFRESCO DE TOKENS


let isRefreshing = false;

let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
    failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
            reject(error);
        } else if (token) {
            resolve(token);
        } else {
            reject(new Error("No token available"));
        }
    });

    failedQueue = [];
}

interface RetryAxiosRequestConfig extends AxiosRequestConfig {
    _retry?: boolean;
}


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as RetryAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers = originalRequest.headers ?? {};
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                })
            }

            isRefreshing = true;

            if (authManager?.refreshToken) {
                try {
                    const newToken = await authManager.refreshToken();
                    processQueue(null, newToken);

                    if (newToken) {
                        originalRequest.headers = originalRequest.headers ?? {};
                        originalRequest.headers.Authorization = `Bearer ${newToken}`;
                        return api(originalRequest);
                    }

                } catch (refreshError) {
                    processQueue(refreshError, null);
                    console.error("Error al refrescar token:", refreshError);
                    if (authManager?.logout) {
                        authManager.logout();
                    }
                } finally {
                    isRefreshing = false; 
                }
            } else {
                authManager?.logout?.();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
)