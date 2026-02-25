import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Category } from "../categories.types"
import TableSkeleton from "@/components/ui/table/TableSkeleton";
import TableEmpty from "@/components/ui/table/TableEmpty";
import TableError from "@/components/ui/table/TableError";
import { formatDateReadable } from "@/helpers/formatDateReadable";
import Badge from "@/components/ui/badge/Badge";
import CategoryTableHead from "./CategoryTableHead";
import { Link } from "react-router";

interface CategoriesTableProps {
    openModal: () => void;
    onRetry: () => void;
    items: Category[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean; 
    search: string;
}

const CategoriesTable = (props: CategoriesTableProps) => {

    return (
        <div className="overflow-hidden transition-opacity border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <CategoryTableHead />
                    {(props.isFetching) || (props.isLoading) ? (
                        <TableSkeleton rows={6} columns={5} />
                    ) : props.isError ? (
                        <TableError colSpan={5} onRetry={() => props.onRetry} />
                    ) : (props.items?.length === 0) && (props.search != "") ? (
                        <TableEmpty
                            colSpan={5}
                            title="No hay categorías"
                            description="La categoría que buscas no existe"
                        />
                    ) : props.items?.length === 0 ? (
                        <TableEmpty
                            colSpan={5}
                            title="No hay categorías"
                            description="Crea tu primera categoría para comenzar."
                            actionLabel="Crear categoría"
                            onAction={() => props.openModal()}
                        />
                    ) : (
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {props.items?.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {category.category}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {category.description || "Sin descripción"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={category.is_active ? "success" : "error"}
                                        >
                                            {category.is_active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {formatDateReadable(category.created_at)}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        <Link to={`${category.id}/details`} className="hover:text-gray-600 dark:hover:text-gray-500">
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

export default CategoriesTable
