import { ApiResponse } from "@/types/apiResponse.types";

export type FormPasswordPayload = {
    password: string;
    new_password: string;
    confirm_password: string;
}

export type FormUserInfo = {
    name: string;
    lastname: string;
    phone: string;
}

type Data = {
    name: string;
    lastname: string;
    document_type: string;
    document_number: string;
    phone: string;
    email: string;
    role: string;
    permissions: [];
}

export type UserInfoData = ApiResponse<Data>;

export type UserMetaCardProps = {
    name: string;
    lastname: string;
    role: string;
    email: string;
}

export type UserInfoCardProps = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    document_type: string;
    document_number: string;
}