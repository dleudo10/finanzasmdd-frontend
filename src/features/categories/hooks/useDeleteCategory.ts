import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteCategory } from "../services/categories.api"
import { useNavigate } from "react-router"

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ["categories"] })
            queryClient.removeQueries({ queryKey: ["categories", id] })
            navigate("/categories")
        },
    })
}