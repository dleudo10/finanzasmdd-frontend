import { ApiResponse } from "@/types/apiResponse.types"

export interface LoginPayload {
    email: string,
    password: string
}

type Data = {
    requires_tenant_selection: boolean,
    access: string,
    tenants?: object[],
    access_expires_in?: string
}

export type LoginResponse = ApiResponse<Data>