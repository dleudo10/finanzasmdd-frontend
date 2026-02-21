import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import PageMeta from "@/components/common/PageMeta"

export function Roles() {
    return (
        <>
            <PageMeta
                title="Roles | Finanzas MDD"
                description="Consulta y gestiona los roles de usuario dentro del sistema Finanzas MDD, incluyendo permisos y accesos asignados."
            />

            <PageBreadcrumb pageTitle="Roles" />
        </>
    )
}