import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import Pagination from "@/components/ui/table/Pagination";
import TableToolbar from "@/components/ui/table/TableToolbar";
import { useAlert } from "@/hooks/useAlert";
import useApiError from "@/hooks/useApiError";
import { useDebounce } from "@/hooks/useDebounce";
import { useModal } from "@/hooks/useModal";
import { PlusIcon } from "@/icons";
import { useEffect, useState } from "react";
import { useGetWarehouse } from "../hooks/useGetWarehouse";
import WarehouseTable from "../components/WarehouseTable";
import WarehouseForm from "../components/form/WarehouseForm";

export function Warehouse() {
    const { isOpen, openModal, closeModal } = useModal();
    const alert = useAlert()
    const { handleError } = useApiError()
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(7)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 400)
    const { data, isLoading, isFetching, error, refetch, isError } = useGetWarehouse({ page, page_size: pageSize, search: debouncedSearch })
    const pageCount = Math.ceil((data?.data?.count || 0) / pageSize);

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch])

    useEffect(() => {
        if (error) {
            const apiError = handleError(error)

            const errorMessage =
                apiError.message ||
                apiError.description ||
                "Ha ocurrido un error desconocido.";

            alert.error(apiError.title, errorMessage)
        }
    }, [error]);


    return (
        <>
            <PageMeta
                title="Bodegas | Finanzas MDD"
                description="Consulta y administra fácilmente los precios de productos en Finanzas MDD, manteniendo tu información actualizada y organizada."
            />

            <PageBreadcrumb pageTitle="Bodegas" />

            <ComponentCard
                title="Bodegas"
                desc="Organiza tus bodegas para gestionar tu inventario en diferentes lugares de almacenamiento y distribución."
                actions={
                    <>
                        <Button
                            type="button"
                            onClick={openModal}
                        >
                            <PlusIcon />
                            Nueva Bodega
                        </Button>
                    </>
                }

            >
                <TableToolbar
                    pageSize={pageSize}
                    search={search}
                    handleChangePageSize={(value) => {
                        setPageSize(Number(value));
                        setPage(1);
                    }}
                    setSearch={setSearch}
                />

                <WarehouseTable
                    items={data?.data?.results}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    openModal={openModal}
                    isError={isError}
                    onRetry={refetch}
                    search={search}
                />

                <Pagination
                    page={page}
                    setPage={setPage}
                    count={data?.data?.count}
                    pageCount={pageCount}
                />
            </ComponentCard>

            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
                <WarehouseForm closeModal={closeModal} />
            </Modal>
        </>
    )
}