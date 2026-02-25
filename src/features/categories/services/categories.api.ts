import { api } from "@/lib/api";
import { ApiResponse } from "@/types/apiResponse.types";
import { Category, CategoryPayload, CategoryResponse, ChangeStateResponse, ServiceProps } from "../categories.types"; 

export const getCategories = async ({params, signal}: ServiceProps): Promise<ApiResponse<CategoryResponse>> => {
    const { data } = await api.get<ApiResponse<CategoryResponse>>("category/", { params, signal } );
    return data;
};

export const createCategory = async (payload: CategoryPayload): Promise<ApiResponse<Category>> => {
    const { data } = await api.post<ApiResponse<Category>>("category/", payload)
    return data
}

export const categoryById = async (id: string): Promise<ApiResponse<Category>> => {
    const { data } = await api.get<ApiResponse<Category>>(`category/${id}/`)
    return data
}

export const updateCategory = async (id: string, payload: CategoryPayload): Promise<ApiResponse<Category>> => {
    const { data } = await api.patch<ApiResponse<Category>>(`category/${id}/`, payload)
    return data
}

export const deleteCategory = async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await api.delete<ApiResponse<null>>(`category/${id}/`)
    return data
}

export const changeStatusCategory = async (id: string): Promise<ApiResponse<ChangeStateResponse>> => {
    const { data } = await api.patch<ApiResponse<ChangeStateResponse>>(`category/${id}/change_state/`)
    return data
}