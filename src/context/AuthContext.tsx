import { setAuthManager, AuthManager, clearAuthManager } from "@/lib/api";
import React, { createContext, useContext, useState, useEffect } from "react"
import { logout, refreshToken } from "@/features/auth/services/auth.api";
import { decodeToken } from "@/helpers/decodeToken";

interface User {
    tenant: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

interface AuthContextValue {
    user: User | null;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    requiresTenantSelection: boolean | null;
    setRequiresTenantSelection: React.Dispatch<React.SetStateAction<boolean | null>>;
    clearSession: () => void;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
}

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider')
    }

    return context
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [requiresTenantSelection, setRequiresTenantSelection] = useState<boolean | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    const clearSession = () => {
        setUser(null)
        setToken(null)
        setRequiresTenantSelection(null)
        clearAuthManager()
    }

    useEffect(() => {
        const authManager: AuthManager = {
            getToken: () => token,
            refreshToken: async () => {
                const data = await refreshToken()
                return data.data?.access || null
            },
            logout: async () => {
                await logout()
                clearSession()
            },
        }

        setAuthManager(authManager)
    }, [token])

    useEffect(() => {
        const handleRefresh = async () => {
            try {
                const data = await refreshToken()
                if (data.data?.access) {
                    setToken(data.data?.access)
                    setRequiresTenantSelection(data.data?.requires_tenant_selection ?? false)
                    const decoded = decodeToken(data.data?.access)
                    if (decoded) {
                        setUser({
                            tenant: decoded.tenant,
                            name: decoded.name,
                            lastname: decoded.lastname,
                            email: decoded.email, 
                            role: decoded.role
                        })
                    }
                }
            } catch {
                logout()
                clearSession()
            } finally {
                setLoading(false)
            }
        }

        handleRefresh()

        const interval = setInterval(handleRefresh, 15 * 60 * 1000)
        return () => clearInterval(interval) 
    }, [])



    const value: AuthContextValue = {
        user,
        token,
        setToken,
        requiresTenantSelection,
        setRequiresTenantSelection,
        clearSession,
        setUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}