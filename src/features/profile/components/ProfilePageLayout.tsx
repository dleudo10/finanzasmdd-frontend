import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import PageMeta from "@/components/common/PageMeta"
import { ReactNode } from "react"

type ProfilePageLayoutProps = {
    children: ReactNode
}

function ProfilePageLayout({ children }: ProfilePageLayoutProps) {
    return (
        <>
            <PageMeta
                title="Perfil | Finanzas MDD"
                description="Página de perfil del usuario en Finanzas MDD"
            />

            <PageBreadcrumb pageTitle="Perfil" />

            {children}
        </>
    )
}

export default ProfilePageLayout

