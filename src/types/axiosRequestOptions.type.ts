export type AxiosParams = {
    page: number;
    page_size: number;
    search?: string;
}

export type AxiosRequestOptions = {
    params: AxiosParams;
    signal?: AbortSignal;
}