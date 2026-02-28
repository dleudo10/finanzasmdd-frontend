import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { deleteWarehouse } from "../services/warehouse.api"

export const useDeleteWarehouse = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (id: string) => deleteWarehouse(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["warehouses"] })
            queryClient.removeQueries({ queryKey: ["warehouses", id] })
            navigate("/warehouse")
        },
    })
}