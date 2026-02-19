export type AlertVariant = "success" | "error" | "warning" | "info";

export interface AlertItem {
    id: string;
    variant: AlertVariant;
    title: string;
    message: string;
    duration?: number;
    showLink?: boolean;
    linkHref?: string;
    linkText?: string;
}
