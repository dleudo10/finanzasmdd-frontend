import { ArrowLeftIcon, ArrowRightIcon } from "@/icons";
import Button from "../button/Button";
import rangePageVisible from "@/helpers/rangePageVisible";

type PaginationProps = {
    setPage: React.Dispatch<React.SetStateAction<number>>;
    page: number;
    pageCount: number;
    count: number | undefined;
}

const Pagination = (props: PaginationProps) => {
    const pages = rangePageVisible({page: props.page, pageCount: props.pageCount})

    return (
        <div className="py-5 px-6 rounded-b-2xl border-t border-gray-200 flex justify-between items-center dark:border-t-white/[0.05]">
            <p className='text-sm text-gray-500 dark:text-gray-400'>
                Mostrando página {props.page} de {props.pageCount} {props.page === 1 ? 'página' : 'páginas'} • Total: {props.count ? props.count : "0"} {props.count === 1 ? 'registro' : 'registros'}
            </p>

            <div className="flex items-center gap-1">
                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="mr-2"
                    onClick={() => props.setPage(Number(props.page) - 1)}
                    disabled={props.page <= 1}
                >
                    <span className="flex justify-center items-center size-4">
                        <ArrowLeftIcon />
                    </span>
                </Button>

                {/* Números de página */}
                {pages.map((pageNum) => (
                    <button
                        key={pageNum}
                        className={`px-3 py-1 text-white rounded hover:bg-brand-600 ${pageNum === props.page ? "bg-brand-500" : "bg-brand-300"}`}
                        onClick={() => {
                            if (pageNum !== props.page) props.setPage(Number(pageNum));
                        }}

                        disabled={pageNum > props.pageCount}
                    >
                        {pageNum}
                    </button>
                ))}

                <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    className="ml-2"
                    onClick={() => props.setPage(Number(props.page) + 1)}
                    disabled={props.page >= props.pageCount}
                >
                    <span className="flex justify-center items-center size-4">
                        <ArrowRightIcon />
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default Pagination
