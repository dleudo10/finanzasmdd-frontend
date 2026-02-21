import { useMutation } from "@tanstack/react-query"
import { userUpdateInfo } from "../services/profile.api"
import { FormUserInfo } from "../profile.types"

export const useUpdateInfo = () => {
    return useMutation({
        mutationFn: (payload: FormUserInfo) => userUpdateInfo(payload)
    })
}