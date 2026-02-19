import { useMutation } from "@tanstack/react-query";
import { LoginPayload } from "../auth.types";
import { login } from "../services/auth.api";
import { useAuth } from "@/context/AuthContext";
import { decodeToken } from "@/helpers/decodeToken";

export const useLogin = () => {
    const {setRequiresTenantSelection, setToken, setUser} = useAuth()

    return useMutation({
        mutationFn: (payload: LoginPayload) => login(payload),
        onSuccess: (data) => {
            setRequiresTenantSelection(data.data?.requires_tenant_selection ?? false)

            if (data.data?.access) {
                setToken(data.data?.access)
                const decoded = decodeToken(data.data.access)
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
            
        }
    })    
}