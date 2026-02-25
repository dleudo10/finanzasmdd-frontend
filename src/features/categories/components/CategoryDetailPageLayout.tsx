import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import { ReactNode } from 'react'

type CategoryDetailPageLayoutProps = {
    children: ReactNode
}

const CategoryDetailPageLayout = ({ children }: CategoryDetailPageLayoutProps) => {
    return (
        <>
            <PageMeta
                title="Detalle de Categoría | Finanzas MDD"
                description="Consulta la información detallada de esta categoría de productos en la plataforma de Finanzas MDD."
            />

            <PageBreadcrumb
                pageTitle="Detalle"
                items={[
                    { label: "Categorias", to: "/categories" }
                ]}
            />

            {children}
        </>
    )
}

export default CategoryDetailPageLayout
