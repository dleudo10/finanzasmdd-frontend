import {api} from "@/lib/api";
import { FormPasswordPayload, FormUserInfo, UserInfoData} from "../profile.types";
import { ApiResponse } from "@/types/apiResponse.types";

export const getProfile = async (): Promise<UserInfoData> => {
    const {data} = await api.get<UserInfoData>("profile/me/")
    return data
}

export const changePassword = async (payload: FormPasswordPayload): Promise<ApiResponse<null>> => {
    const {data} = await api.patch<ApiResponse<null>>("profile/change-password/", payload)
    return data 
}

export const userUpdateInfo = async (payload: FormUserInfo): Promise<UserInfoData> => {
    const {data} = await api.patch<UserInfoData>("profile/me/", payload)
    return data
} 