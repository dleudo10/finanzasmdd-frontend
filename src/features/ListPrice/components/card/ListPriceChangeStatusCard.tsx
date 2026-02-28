import { Modal } from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal';
import { RefreshCwIcon } from '@/icons'
import { useParams } from 'react-router';
import ListPriceFormChangeStatus from './ListPriceFormChangeStatus';

type StateProps = {
    is_active: boolean;
}

const ListPriceChangeStatusCard = ({ is_active }: StateProps) => {
    const { isOpen, openModal, closeModal } = useModal();
    const { id } = useParams<{ id: string }>();

    if (!id) {
        throw new Error("id es requerido");
    }

    return (
        <>
            <div className="mb-5 p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
                            Cambiar el estado de la lista de precio
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            La lista de precio esta actualmente {is_active ? "activa" : "inactiva"}.
                        </p>
                    </div>

                    <button
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-error-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600 lg:inline-flex lg:w-auto"
                    >
                        <RefreshCwIcon className='size-4' />
                        Cambiar estado
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
                <ListPriceFormChangeStatus
                    id={id}
                    is_active={is_active}
                    closeModal={closeModal}
                />
            </Modal>
        </>
    )
}

export default ListPriceChangeStatusCard
