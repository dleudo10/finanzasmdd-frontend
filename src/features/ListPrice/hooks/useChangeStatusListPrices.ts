import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeStatusListPrice } from "../services/listprice.api"

export const useChangeStatusListPrices = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => changeStatusListPrice(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-prices"] })
        },
    })
}