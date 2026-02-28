import { useQuery } from "@tanstack/react-query"
import { listPriceById } from "../services/listprice.api";

export const useListPriceById = (id?: string) => {
    return useQuery({
        queryKey: ["list-prices", id],
        queryFn: () => {
            if (!id) throw new Error("No existe un ID para esta lista de precio");
            return listPriceById(id);
        },
        enabled: Boolean(id)
    })
}