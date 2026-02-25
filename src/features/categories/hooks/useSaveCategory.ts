import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createCategory, updateCategory } from "../services/categories.api"
import { CategoryPayload } from "../categories.types"

type SaveArguments = {
    id?: string
    payload: CategoryPayload
}

export const useSaveCategory = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, payload }: SaveArguments) => {
            if (id) {
                return updateCategory(id, payload)
            }
            return createCategory(payload)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
        },
    })
}