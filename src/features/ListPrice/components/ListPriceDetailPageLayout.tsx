import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import { ReactNode } from 'react'

type ListPriceDetailPageLayoutProps = {
    children: ReactNode
}

const ListPriceDetailPageLayout = ({ children }: ListPriceDetailPageLayoutProps) => {
    return (
        <>
            <PageMeta
                title="Detalle de la lista de precios | Finanzas MDD"
                description="Accede al detalle completo de esta lista de precios y gestiona los valores aplicados a los productos según el tipo de venta."            
            />
            
            <PageBreadcrumb
                pageTitle="Detalle"
                items={[
                    { label: "lista de precios", to: "/list-price" }
                ]}
            />

            {children}
        </>
    )
}

export default ListPriceDetailPageLayout

