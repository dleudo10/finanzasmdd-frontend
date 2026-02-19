interface SpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = "md", className }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-6 h-6",
        lg: "w-8 h-8",
    };

    return (
        <div 
            role="status"
            aria-busy="true"
            aria-label="Cargando"
            className={`inline-block animate-spin border-t-transparent rounded-full border-white dark:border-gray-900 border-2 ${sizeClasses[size]} ${className}`}
        />
    )
}

export default Spinner;
