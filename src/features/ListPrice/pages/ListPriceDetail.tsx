import { useParams } from 'react-router';
import { useEffect } from 'react';
import useApiError from '@/hooks/useApiError';
import { useAlert } from '@/hooks/useAlert';
import ErrorDetail from '@/components/common/ErrorDetail';
import { useListPriceById } from '../hooks/useListPriceById';
import ListPriceDetailPageLayout from '../components/ListPriceDetailPageLayout';
import PlaceHolderListPriceDetails from '../components/PlaceHolderListPriceDetails';
import ListPriceInfoCard from '../components/card/ListPriceInfoCard';
import ListPriceChangeStatusCard from '../components/card/ListPriceChangeStatusCard';
import ListPriceDeleteCard from '../components/card/ListPriceDeleteCard';

export function ListPriceDetail() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error, refetch } = useListPriceById(id)
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
        <ListPriceDetailPageLayout>
            {isLoading ? (
                <PlaceHolderListPriceDetails />
            ) : !data?.success ? (
                <ErrorDetail
                    message={"No pudimos cargar la información de esta lista de precio."}
                    onRetry={refetch}
                />
            ) : (
                <>
                    <ListPriceInfoCard
                        id={data.data.id}
                        name={data.data.name}
                        is_base={data.data.is_base}
                        is_active={data.data.is_active}
                        created_at={data.data.created_at}
                    />

                    <ListPriceChangeStatusCard
                        is_active={data.data.is_active}
                    />

                    <ListPriceDeleteCard />
                </>
            )}
        </ListPriceDetailPageLayout>
    )
}

export default ListPriceDetail