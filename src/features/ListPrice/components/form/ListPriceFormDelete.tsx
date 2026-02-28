import Button from '@/components/ui/button/Button';
import Spinner from '@/components/ui/loaders/Spinner';
import useApiError from '@/hooks/useApiError';
import { useAlert } from '@/hooks/useAlert';
import { useDeleteListPrice } from '../../hooks/useDeleteListPrice';

type ListPriceFormDeleteProps = {
    id: string;
    closeModal: () => void;
}

const ListPriceFormDelete = ({ id, closeModal }: ListPriceFormDeleteProps) => {
    const { mutate, isPending } = useDeleteListPrice()
    const alert = useAlert()
    const { handleError } = useApiError()

    const onSubmit = () => {
        mutate(id, {
            onSuccess: () => {
                closeModal()
                alert.success("Eliminado", "Lista de precio eliminado correctamente")
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
                    Eliminar lista de precio
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    Esta acción eliminará permanentemente la lista de precio.
                    Los registros asociados podrían verse afectados.
                    Esta acción no se puede deshacer.
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
                    {isPending ? <Spinner size="sm" /> : 'Eliminar'}
                </Button>
            </div>
        </div>
    )
}

export default ListPriceFormDelete
