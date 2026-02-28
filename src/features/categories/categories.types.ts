import { PaginatedResponse } from "@/types/pagination.types";

export type Category = {
    id: string;
    category: string;
    description: string | null;
    is_active: boolean;
    created_at: string;
}

export type CategoryResponse = PaginatedResponse<Category>;

export type ServiceProps = {
    params: {
        page: number
        page_size: number
        search?: string
    }
    signal?: AbortSignal
};

export type CategoryPayload = {
    category: string;
    description?: string | null;
    is_active: boolean;
}

// Props del formulario de creación y edicion
export type CategoryFormProps = {
    instance? : Category;
    closeModal: () => void;
}

// Props para los params en axios
export type QueryProps = {
    page: number;
    pageSize: number;
    search?: string;
}

export type ChangeStateResponse = {
    id: string;
    is_active: boolean;
}

// Props para el detalle de una caegoria
// export type CategoryInfoCardProps = {
//     instance: Category,
// }