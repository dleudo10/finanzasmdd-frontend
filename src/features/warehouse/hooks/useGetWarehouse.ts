import { AxiosParams } from "@/types/axiosRequestOptions.type"
import { useQuery } from "@tanstack/react-query"
import { getWarehouse } from "../services/warehouse.api"

export const useGetWarehouse = ({page, page_size, search}: AxiosParams) => {
    return useQuery({
        queryKey: ["warehouses", page, page_size, search],
        queryFn: ({ signal }) => getWarehouse({
            params: {
                page, 
                page_size, 
                search
            },
            signal
        }),
    })
}