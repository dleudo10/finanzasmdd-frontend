import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createWarehouse, updateWarehouse } from "../services/warehouse.api"
import { WarehousePayload } from "../warehouse.types"

type SaveArguments = {
    id?: string
    payload: WarehousePayload
}

export const useSaveWarehouse = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, payload }: SaveArguments) => {
            if (id) {
                return updateWarehouse(id, payload)
            }
            return createWarehouse(payload)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] })
        },
    })
}