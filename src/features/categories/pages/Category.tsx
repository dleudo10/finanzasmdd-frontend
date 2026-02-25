import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import Button from "@/components/ui/button/Button";
import TableToolbar from "@/components/ui/table/TableToolbar";
import CategoriesTable from "../components/CategoriesTable";
import Pagination from "@/components/ui/table/Pagination";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { PlusIcon } from "@/icons";
import { useGetCategories } from "../hooks/useGetCategories";
import { useEffect, useState } from "react";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import { useDebounce } from "@/hooks/useDebounce";
import CategoryForm from "../components/form/CategoryForm";

export function Category() {
    const { isOpen, openModal, closeModal } = useModal();
    const { handleError } = useApiError()
    const alert = useAlert()
    const [page, setPage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(7)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 400)
    const { data, isLoading, isFetching, error, refetch, isError } = useGetCategories({ page, pageSize, search: debouncedSearch })
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
                title="Categorias | Finanzas MDD"
                description="Gestiona y organiza de forma segura las categorías de productos en la plataforma de Finanzas MDD."
            />

            <PageBreadcrumb pageTitle="Categorias" />

            <ComponentCard
                title="Lista de categorías"
                desc="Administra fácilmente las categorías que organizan tus productos."
                actions={
                    <>
                        <Button
                            type="button"
                            onClick={openModal}
                        >
                            <PlusIcon />
                            Nueva Categoria
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

                <CategoriesTable
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
                <CategoryForm closeModal={closeModal} />
            </Modal>

        </>
    )
}