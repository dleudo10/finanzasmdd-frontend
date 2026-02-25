import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeStatusCategory } from "../services/categories.api"

export const useChangeStatusCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => changeStatusCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
    })
}