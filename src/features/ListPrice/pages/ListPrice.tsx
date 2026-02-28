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
import { useGetListPrice } from "../hooks/useGetListPrices";
import ListPriceTable from "../components/ListPriceTable";
import ListPriceForm from "../components/form/ListPriceForm";

export function ListPrice() {
    const { isOpen, openModal, closeModal } = useModal();
    const alert = useAlert()
    const { handleError } = useApiError()
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(7)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 400)
    const { data, isLoading, isFetching, error, refetch, isError } = useGetListPrice({ page, page_size: pageSize, search: debouncedSearch })
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
                title="Lista de Precios | Finanzas MDD"
                description="Consulta y administra fácilmente los precios de productos en Finanzas MDD, manteniendo tu información actualizada y organizada."
            />

            <PageBreadcrumb pageTitle="Lista de precios" />

            <ComponentCard
                title="Lista de precios"
                desc="Gestiona y organiza ditintos precios para las ventas de tus productos."
                actions={
                    <>
                        <Button
                            type="button"
                            onClick={openModal}
                        >
                            <PlusIcon />
                            Nueva Lista de Precios
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

                <ListPriceTable
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
                <ListPriceForm closeModal={closeModal} />
            </Modal>
        </>
    )
}