import Button from '@/components/ui/button/Button';
import Spinner from '@/components/ui/loaders/Spinner';
import useApiError from '@/hooks/useApiError';
import { useAlert } from '@/hooks/useAlert';
import { useChangeStatusWarehouse } from '../../hooks/useChangeStatusWarehouse';

type WarehouseFormProps = {
    id: string;
    is_active: boolean;
    closeModal: () => void;
}

const WarehouseFormChangeStatus = ({ id, is_active, closeModal }: WarehouseFormProps) => {
    const { mutate, isPending } = useChangeStatusWarehouse()
    const alert = useAlert()
    const { handleError } = useApiError()

    const onSubmit = () => {
        mutate(id, {
            onSuccess: (data) => {
                closeModal()
                alert.success(
                    "Estado actualizado",
                    `La bodega fue ${data.data?.is_active ? "activada" : "desactivada"
                    } correctamente`
                )
            },
            onError: (error) => {
                const apiError = handleError(error)
                alert.error(apiError.title, apiError.description)
            }
        })
    }

    return (
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    {is_active ? "Desactivar bodega" : "Activar bodega"}
                </h4>

                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    {is_active
                        ? "La bodega no podrá utilizarse hasta ser reactivada."
                        : "La bodega volverá a estar disponible para su uso." }
                </p>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={() => {
                        closeModal();
                    }}
                    disabled={isPending}
                    aria-busy={isPending}
                >
                    Cancelar
                </Button>
                <Button size="sm" type="submit" disabled={isPending} aria-busy={isPending} onClick={onSubmit}>
                    {isPending ? (
                        <Spinner size="sm" />
                    ) : is_active ? (
                        "Desactivar"
                    ) : (
                        "Activar"
                    )}
                </Button>
            </div>
        </div>
    )
}

export default WarehouseFormChangeStatus

