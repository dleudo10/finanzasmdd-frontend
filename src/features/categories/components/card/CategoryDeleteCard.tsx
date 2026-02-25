import { Modal } from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal';
import { TrashBinIcon } from '@/icons'
import CategoryFormDelete from '../form/CategoryFormDelete';
import { useParams } from 'react-router';

const CategoryDeleteCard = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const { id } = useParams<{ id: string }>();

    if (!id) {
        throw new Error("Category id is required");
    }

    return (
        <>
            <div className="p-5 border border-gray-200 bg-white rounded-2xl dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-2">
                            Eliminar categoría
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Esta acción ocultará la categoría y no podrá usarse hasta reactivarla.
                        </p>
                    </div>

                    <button
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-error-500 px-4 py-3 text-sm font-medium text-white shadow-theme-xs hover:bg-error-600 lg:inline-flex lg:w-auto"
                    >
                        <TrashBinIcon className='size-4' />
                        Eliminar
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
                <CategoryFormDelete
                    id={id}
                    closeModal={closeModal}
                />
            </Modal>
        </>
    )
}

export default CategoryDeleteCard
