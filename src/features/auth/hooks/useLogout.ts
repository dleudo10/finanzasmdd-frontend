import { useMutation } from "@tanstack/react-query"
import { logout } from "../services/auth.api"
import { useAuth } from "@/context/AuthContext"
import {queryClient} from "@/lib/queryClient"
import { useNavigate } from "react-router"

export const useLogout = () => {
    const {clearSession} = useAuth()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: () => logout(),
        onSettled: () => {
            clearSession()
            queryClient.clear()
            navigate("/signin")
        }
    })
}