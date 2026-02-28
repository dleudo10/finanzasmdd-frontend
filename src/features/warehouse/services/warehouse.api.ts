import { ApiResponse } from "@/types/apiResponse.types";
import { AxiosRequestOptions } from "@/types/axiosRequestOptions.type"
import { Warehouse, WarehousePayload, WarehouseResponse } from "../warehouse.types";
import { api } from "@/lib/api";
import { ChangeStateResponse } from "@/types/changeStateResponse";

export const getWarehouse = async ({params, signal}: AxiosRequestOptions ): Promise<ApiResponse<WarehouseResponse>> => {
    const { data } = await api.get<ApiResponse<WarehouseResponse>>("warehouse/", { params, signal });
    return data
}

export const createWarehouse = async (payload: WarehousePayload): Promise<ApiResponse<Warehouse>> => {
    const { data } = await api.post<ApiResponse<Warehouse>>("warehouse/", payload)
    return data
}

export const updateWarehouse = async (id: string, payload: WarehousePayload): Promise<ApiResponse<Warehouse>> => {
    const { data } = await api.patch<ApiResponse<Warehouse>>(`warehouse/${id}/`, payload)
    return data
} 

export const warehouseById = async (id: string): Promise<ApiResponse<Warehouse>> => {
    const { data } = await api.get<ApiResponse<Warehouse>>(`warehouse/${id}/`)
    return data
}

export const deleteWarehouse = async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete<ApiResponse<null>>(`warehouse/${id}/`)
    return data
}

export const changeStatusWarehouse = async (id: string): Promise<ApiResponse<ChangeStateResponse>> => {
    const { data } = await api.patch<ApiResponse<ChangeStateResponse>>(`warehouse/${id}/change_state/`)
    return data
}