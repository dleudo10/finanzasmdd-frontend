import { api } from "@/lib/api";

export const getRoles = async (): Promise<Class> => {
    const { data } = await api.get<>("roles/")
}


export const userUpdateInfo = async (payload: FormUserInfo): Promise<UserInfoData> => {
    const {data} = await api.patch<UserInfoData>("profile/me/", payload)
    return data
} 