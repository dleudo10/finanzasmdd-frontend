export interface ApiResponse<T> {
    succes: boolean,
    message: string,
    data: T | null,
    errors: object[] | null
}