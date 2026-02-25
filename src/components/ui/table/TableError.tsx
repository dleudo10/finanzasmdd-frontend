import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import { AlertIcon } from "@/icons";

interface TableErrorProps {
    colSpan: number;
    title?: string;
    description?: string;
    onRetry?: () => void;
}

const TableError = ({
    colSpan,
    title = "Ocurrió un error",
    description = "No pudimos cargar los datos. Intenta nuevamente.",
    onRetry,
}: TableErrorProps) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={colSpan} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">

                        {/* Icon */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 dark:bg-red-900/30">
                            <AlertIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                        </div>

                        {/* Text */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90">
                                {title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {description}
                            </p>
                        </div>

                        {/* Retry */}
                        {onRetry && (
                            <Button type="button" size="sm" onClick={onRetry}>
                                Reintentar
                            </Button>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default TableError;