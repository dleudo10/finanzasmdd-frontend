import { AxiosParams } from "@/types/axiosRequestOptions.type"
import { useQuery } from "@tanstack/react-query"
import { getListPrices } from "../services/listprice.api"

export const useGetListPrice = ({page, page_size, search}: AxiosParams) => {
    return useQuery({
        queryKey: ["list-prices", page, page_size, search],
        queryFn: ({ signal }) => getListPrices({
            params: {
                page, 
                page_size, 
                search
            },
            signal
        }),
    })
}