import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import { InboxIcon } from "@/icons";

interface TableEmptyProps {
    colSpan: number;
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
}

const TableEmpty = ({
    colSpan,
    title = "No hay datos disponibles",
    description = "Cuando existan registros aparecerán aquí.",
    actionLabel,
    onAction,
}: TableEmptyProps) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell colSpan={colSpan} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">

                        {/* Icon */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800">
                            <InboxIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
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

                        {/* Optional Action */}
                        {actionLabel && onAction && (
                            <Button type="button" size="sm" onClick={onAction}>
                                {actionLabel}
                            </Button>
                        )}
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    );
};

export default TableEmpty;