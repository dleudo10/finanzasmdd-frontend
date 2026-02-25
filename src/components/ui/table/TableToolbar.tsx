import Label from "@/components/form/Label";
import { SearchIcon } from "@/icons";
import Select from "@/components/form/Select";

type TableToolbarProps = {
    handleChangePageSize: (value: string) => void;
    pageSize: number;
    search: string;
    setSearch: (value: string) => void;
}

const TableToolbar = ({ handleChangePageSize, pageSize, setSearch, search }: TableToolbarProps) => {

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className='p-4 flex justify-between items-end sm:p-6'>
            <div className="flex flex-col">
                <Label className="text-xs text-gray-400">
                    Mostrar
                </Label>
                <Select
                    options={[
                        { value: "7", label: "7" },
                        { value: "18", label: "18" },
                        { value: "30", label: "30" },
                    ]}
                    onChange={handleChangePageSize}
                    defaultValue={String(pageSize)}
                    placeholder="Mostrar"
                    className="dark:bg-dark-900 h-9! py-0! pr-0"
                />
            </div>
            <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                    <SearchIcon className="text-gray-500 dark:text-gray-400 size-5" />
                </span>
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="h-11 max-w-[450px] w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700/60 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    )
}

export default TableToolbar
