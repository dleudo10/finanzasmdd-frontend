import { PaginatedResponse } from "@/types/pagination.types";

export type Warehouse = {
    id: string;
    name: string;
    location?: string;
    observations?: string;
    is_main: boolean;
    is_active: boolean;
    created_at: string;
}

export type WarehouseResponse = PaginatedResponse<Warehouse>;

export type WarehousePayload = {
    name: string;
    location?: string;
    observations?: string;
    is_active: boolean;
}

export type WarehouseFormProps = {
    instance? : Warehouse;
    closeModal: () => void;
}

export type ChangeStateResponse = {
    id: string;
    is_active: boolean;
}