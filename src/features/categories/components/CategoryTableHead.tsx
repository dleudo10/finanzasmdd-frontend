import { TableCell, TableHeader, TableRow } from '@/components/ui/table'

const CategoryTableHead = () => {
    return (
        <TableHeader className="border-b border-gray-200 dark:border-white/[0.05]">
            <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Categoría
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Descripción
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
    )
}

export default CategoryTableHead
