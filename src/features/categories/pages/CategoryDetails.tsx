import { useCategoryById } from '../hooks/useCategoryById'
import { useParams } from 'react-router';
import { useEffect } from 'react';
import useApiError from '@/hooks/useApiError';
import { useAlert } from '@/hooks/useAlert';
import PlaceHolderCategoryDetails from '../components/PlaceHolderCategoryDetails';
import CategoryInfoCard from '../components/card/CategoryInfoCard';
import CategoryDeleteCard from '../components/card/CategoryDeleteCard';
import CategoryChangeStatusCard from '../components/card/CategoryChangeStatusCard';
import ErrorDetail from '@/components/common/ErrorDetail';
import CategoryDetailPageLayout from '../components/CategoryDetailPageLayout';

export function CategoryDetails() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error, refetch } = useCategoryById(id)
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
        <CategoryDetailPageLayout>
            {isLoading ? (
                <PlaceHolderCategoryDetails />
            ) : !data?.success ? (
                <ErrorDetail
                    message={"No pudimos cargar la información de la categoría."}
                    onRetry={refetch}
                />
            ) : (
                <>
                    <CategoryInfoCard
                        id={data.data.id}
                        category={data.data.category}
                        description={data.data.description}
                        is_active={data.data.is_active}
                        created_at={data.data.created_at}
                    />

                    <CategoryChangeStatusCard
                        is_active={data.data.is_active}
                    />

                    <CategoryDeleteCard />
                </>
            )}
        </CategoryDetailPageLayout>
    )
}

export default CategoryDetails
