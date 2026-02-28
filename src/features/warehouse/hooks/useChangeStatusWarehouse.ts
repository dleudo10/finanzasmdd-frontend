import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeStatusWarehouse } from "../services/warehouse.api"

export const useChangeStatusWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string) => changeStatusWarehouse(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] })
        },
    })
}