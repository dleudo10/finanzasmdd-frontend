import { useParams } from 'react-router';
import { useEffect } from 'react';
import useApiError from '@/hooks/useApiError';
import { useAlert } from '@/hooks/useAlert';
import ErrorDetail from '@/components/common/ErrorDetail';
import { useWarehouseById } from '../hooks/useWarehouseById';
import WarehouseDetailPageLayout from '../components/WarehouseDetailPageLayout';
import PlaceHolderWarehouseDetails from '../components/PlaceHolderWarehouseDetails';
import WarehouseInfoCard from '../components/card/WarehouseInfoCard';
import WarehouseChangeStatusCard from '../components/card/WarehouseChangeStatusCard';
import WarehouseDeleteCard from '../components/card/WarehouseDeleteCard';

export function WarehouseDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error, refetch } = useWarehouseById(id)
    const { handleError } = useApiError()
    const alert = useAlert()

    useEffect(() => {
        if (error) {
            const apiError = handleError(error)

            console.log(apiError)

            const errorMessage =
                apiError.message ||
                apiError.description ||
                "Ha ocurrido un error desconocido.";

            alert.error(apiError.title, errorMessage)
        }
    }, [error])

    return (
        <WarehouseDetailPageLayout>
            {isLoading ? (
                <PlaceHolderWarehouseDetails />
            ) : !data?.success ? (
                <ErrorDetail
                    message={"No pudimos cargar la información de la bodega."}
                    onRetry={refetch}
                />
            ) : (
                <>
                    <WarehouseInfoCard
                        id={data.data.id}
                        name={data.data.name}
                        location={data.data.location}
                        observations={data.data.observations}
                        is_main={data.data.is_main}
                        is_active={data.data.is_active}
                        created_at={data.data.created_at}
                    />

                    <WarehouseChangeStatusCard
                        is_active={data.data.is_active}
                    />

                    <WarehouseDeleteCard />
                </>
            )}
        </WarehouseDetailPageLayout>
    )
}
