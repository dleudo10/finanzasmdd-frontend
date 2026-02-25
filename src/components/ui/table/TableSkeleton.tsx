import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import Skeleton from "@/components/ui/skeleton/Skeleton";

interface TableSkeletonProps {
    rows?: number;
    columns?: number;
}

const TableSkeleton = ({
    rows = 5,
    columns = 5,
}: TableSkeletonProps) => {
    return (
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableCell
                            key={colIndex}
                            className="px-4 py-3"
                        >
                            <Skeleton className="h-4 w-full max-w-[180px]" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
};

export default TableSkeleton;