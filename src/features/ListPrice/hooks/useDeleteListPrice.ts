import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"
import { deleteListPrice } from "../services/listprice.api"

export const useDeleteListPrice = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (id: string) => deleteListPrice(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["list-prices"] })
            queryClient.removeQueries({ queryKey: ["list-prices", id] })
            navigate("/list-price")
        },
    })
}