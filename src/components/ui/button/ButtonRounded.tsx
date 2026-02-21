type ButtonRoundedProps = {
    type: "button" | "submit" | "reset";
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const ButtonRounded = (props: ButtonRoundedProps) => {
    return (
        <button 
            type={props.type} 
            onClick={props.onClick}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
        >
            {props.children}
        </button>
    )
}

export default ButtonRounded
