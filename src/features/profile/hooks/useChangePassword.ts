import { useMutation } from "@tanstack/react-query";
import { FormPasswordPayload } from "../profile.types";
import { changePassword } from "../services/profile.api";

export const useChangePassword = () => {
    return useMutation({
        mutationFn: (payload: FormPasswordPayload) => changePassword(payload)
    })    
}