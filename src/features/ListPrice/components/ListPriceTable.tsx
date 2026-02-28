import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import TableSkeleton from "@/components/ui/table/TableSkeleton";
import TableEmpty from "@/components/ui/table/TableEmpty";
import TableError from "@/components/ui/table/TableError";
import { formatDateReadable } from "@/helpers/formatDateReadable";
import Badge from "@/components/ui/badge/Badge";
import { Link } from "react-router";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { ListPrice } from "../listprice.types";

interface ListPriceTableProps {
    openModal: () => void;
    onRetry: () => void;
    items: ListPrice[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    search: string;
}

const ListPriceTable = (props: ListPriceTableProps) => {

    return (
        <div className="overflow-hidden transition-opacity border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Lista de precio
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Principal
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                lista base
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Creado el
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Operaciones
                            </TableCell>
                        </TableRow>
                    </TableHeader>
                    {(props.isFetching) || (props.isLoading) ? (
                        <TableSkeleton rows={7} columns={5} />
                    ) : props.isError ? (
                        <TableError colSpan={5} onRetry={() => props.onRetry} />
                    ) : (props.items?.length === 0) && (props.search != "") ? (
                        <TableEmpty
                            colSpan={5}
                            title="No hay lista de precios"
                            description="La lista de precio que buscas no existe"
                        />
                    ) : props.items?.length === 0 ? (
                        <TableEmpty
                            colSpan={5}
                            title="No hay lista de precios"
                            description="Crea tu primera lista de precio para comenzar."
                            actionLabel="Crear lista de precio"
                            onAction={() => props.openModal()}
                        />
                    ) : (
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {props.items?.map((listPrice) => (
                                <TableRow key={listPrice.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {capitalizeFirstLetter(listPrice.name)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {listPrice.is_base ? "Si" : "No"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={listPrice.is_active ? "success" : "error"}
                                        >
                                            {listPrice.is_active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {formatDateReadable(listPrice.created_at)}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        <Link to={`${listPrice.id}/details`} className="hover:text-gray-600 dark:hover:text-gray-500">
                                            Ver
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    )}
                </Table>
            </div>
        </div >
    )
}

export default ListPriceTable
