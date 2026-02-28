import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table"
import TableSkeleton from "@/components/ui/table/TableSkeleton";
import TableEmpty from "@/components/ui/table/TableEmpty";
import TableError from "@/components/ui/table/TableError";
import { formatDateReadable } from "@/helpers/formatDateReadable";
import Badge from "@/components/ui/badge/Badge";
import { Link } from "react-router";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import { Warehouse } from "../warehouse.types";

interface WarehouseTableProps {
    openModal: () => void;
    onRetry: () => void;
    items: Warehouse[] | undefined;
    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;
    search: string;
}

const WarehouseTable = (props: WarehouseTableProps) => {

    return (
        <div className="overflow-hidden transition-opacity border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-full overflow-x-auto">
                <Table>
                    <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
                        <TableRow>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Bodega
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Principal
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Ubicación
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Observaciones
                            </TableCell>
                            <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                                Estado
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
                            title="No hay bodegas"
                            description="La bodega que buscas no existe"
                        />
                    ) : props.items?.length === 0 ? (
                        <TableEmpty
                            colSpan={5}
                            title="No hay bodegas"
                            description="Crea tu primera bodega para comenzar."
                            actionLabel="Crear bodega"
                            onAction={() => props.openModal()}
                        />
                    ) : (
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {props.items?.map((warehouse) => (
                                <TableRow key={warehouse.id}>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {capitalizeFirstLetter(warehouse.name)}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {warehouse.is_main ? "Si" : "No"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {warehouse.location ? capitalizeFirstLetter(warehouse.location) : "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {warehouse.observations ? capitalizeFirstLetter(warehouse.observations) : "-"}
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        <Badge
                                            size="sm"
                                            color={warehouse.is_active ? "success" : "error"}
                                        >
                                            {warehouse.is_active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {formatDateReadable(warehouse.created_at)}
                                    </TableCell>

                                    <TableCell className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400">
                                        <Link to={`${warehouse.id}/details`} className="hover:text-gray-600 dark:hover:text-gray-500">
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

export default WarehouseTable
