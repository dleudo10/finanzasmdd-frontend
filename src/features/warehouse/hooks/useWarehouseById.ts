import { useQuery } from "@tanstack/react-query"
import { warehouseById } from "../services/warehouse.api";

export const useWarehouseById = (id?: string) => {
    return useQuery({
        queryKey: ["warehouses", id],
        queryFn: () => {
            if (!id) throw new Error("No existe un ID para esta bodega");
            return warehouseById(id);
        },
        enabled: Boolean(id)
    })
}