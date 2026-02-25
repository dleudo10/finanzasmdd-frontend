import { useQuery } from "@tanstack/react-query"
import { categoryById } from "../services/categories.api"

export const useCategoryById = (id?: string) => {
    return useQuery({
        queryKey: ["categories", id],
        queryFn: () => {
            if (!id) throw new Error("No existe un ID para esta categoria");
            return categoryById(id);
        },
        enabled: Boolean(id)
    })
}