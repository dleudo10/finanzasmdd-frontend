import { PaginatedResponse } from "@/types/pagination.types";

export type ListPrice = {
    id: string;
    name: string;
    is_base: boolean;
    is_active: boolean;
    created_at: string;
}

export type ListPriceResponse = PaginatedResponse<ListPrice>;

export type ListPricePayload = {
    name: string;
    is_active: boolean;
}

// Props del formulario de creación y edicion
export type ListPriceFormProps = {
    instance? : ListPrice;
    closeModal: () => void;
}

export type ChangeStateResponse = {
    id: string;
    is_active: boolean;
}