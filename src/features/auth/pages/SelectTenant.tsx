import PageMeta from "@/components/common/PageMeta";
import AuthLayout from "../components/AuthPageLayout";
import SelectTenantForm from "../components/SelectTenantForm";

export function SelectTenant() {
    return (
        <>
            <PageMeta
                title="Seleccionar Empresa | Finanzas MDD"
                description="Accede de forma segura a la plataforma de Finanzas MDD para administrar usuarios, roles y operaciones financieras."
            />
            <AuthLayout>
                <SelectTenantForm />
            </AuthLayout>
        </>
    )
}