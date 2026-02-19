import { api } from "@/lib/api";
import { LoginPayload, LoginResponse } from "../auth.types"
import Cookies from "js-cookie"

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("auth/login/", payload)
    return data
}

export const logout = async (): Promise<void> => {
    const csrftoken = Cookies.get("csrftoken")
    await api.post("auth/logout/", {}, {
        headers: {
            "X-CSRFToken": csrftoken
        }
    })
}

export const refreshToken = async (): Promise<LoginResponse> => {
    const csrftoken = Cookies.get("csrftoken")
    const { data } = await api.post<LoginResponse>("auth/tokens/refresh/", {}, {
        headers: {
            "X-CSRFToken": csrftoken
        }
    })
    return data
}