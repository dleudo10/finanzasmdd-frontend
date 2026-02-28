import PageBreadcrumb from '@/components/common/PageBreadCrumb'
import PageMeta from '@/components/common/PageMeta'
import { ReactNode } from 'react'

type WarehouseDetailPageLayoutProps = {
    children: ReactNode
}

const WarehouseDetailPageLayout = ({ children }: WarehouseDetailPageLayoutProps) => {
    return (
        <>
            <PageMeta
                title="Detalle de las bodegas | Finanzas MDD"
                description="Accede al detalle completo de esta lista de precios y gestiona los valores aplicados a los productos según el tipo de venta."            
            />
            
            <PageBreadcrumb
                pageTitle="Detalle"
                items={[
                    { label: "Bodegas", to: "/warehouse" }
                ]}
            />

            {children}
        </>
    )
}

export default WarehouseDetailPageLayout

