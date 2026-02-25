import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../services/categories.api"
import { QueryProps } from "../categories.types"

export const useGetCategories = ({page, pageSize, search }: QueryProps) => {
    return useQuery({
        queryKey: ["categories", page, pageSize, search],
        queryFn: ({ signal }) => getCategories({
            params: {
                page, 
                page_size: pageSize, 
                search
            },
            signal
        }),
    })
}