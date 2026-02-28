import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createListPrices, updateListPrices } from "../services/listprice.api"
import { ListPricePayload } from "../listprice.types"

type SaveArguments = {
    id?: string
    payload: ListPricePayload
}

export const useSaveListPrice = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, payload }: SaveArguments) => {
            if (id) {
                return updateListPrices(id, payload)
            }
            return createListPrices(payload)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-prices"] })
        },
    })
}