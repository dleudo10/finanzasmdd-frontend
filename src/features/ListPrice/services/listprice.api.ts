import { ApiResponse } from "@/types/apiResponse.types";
import { AxiosRequestOptions } from "@/types/axiosRequestOptions.type"
import { ListPrice, ListPricePayload, ListPriceResponse } from "../listprice.types";
import { api } from "@/lib/api";
import { ChangeStateResponse } from "@/types/changeStateResponse";

export const getListPrices = async ({params, signal}: AxiosRequestOptions ): Promise<ApiResponse<ListPriceResponse>> => {
    const { data } = await api.get<ApiResponse<ListPriceResponse>>("list-price/", { params, signal });
    return data
}

export const createListPrices = async (payload: ListPricePayload): Promise<ApiResponse<ListPrice>> => {
    const { data } = await api.post<ApiResponse<ListPrice>>("list-price/", payload)
    return data
}

export const updateListPrices = async (id: string, payload: ListPricePayload): Promise<ApiResponse<ListPrice>> => {
    const { data } = await api.patch<ApiResponse<ListPrice>>(`list-price/${id}/`, payload)
    return data
} 

export const listPriceById = async (id: string): Promise<ApiResponse<ListPrice>> => {
    const { data } = await api.get<ApiResponse<ListPrice>>(`list-price/${id}/`)
    return data
}

export const deleteListPrice = async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete<ApiResponse<null>>(`list-price/${id}/`)
    return data
}

export const changeStatusListPrice = async (id: string): Promise<ApiResponse<ChangeStateResponse>> => {
    const { data } = await api.patch<ApiResponse<ChangeStateResponse>>(`list-price/${id}/change_state/`)
    return data
}