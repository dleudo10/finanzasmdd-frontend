import Button from "@/components/ui/button/Button";
import { AlertHexaIcon } from "@/icons";

interface ErrorProfileProps {
    message?: string;
    onRetry?: () => void;
}

const ErrorDetail = ({
    message = "No pudimos cargar la información del recurso.",
    onRetry,
}: ErrorProfileProps) => {
    return (
        <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col items-center justify-center py-16 text-center space-y-6">

                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
                    <AlertHexaIcon className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>

                {/* Title */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                        Ocurrió un error
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-md">
                        {message}
                    </p>
                </div>

                {/* Retry button */}
                {onRetry && (
                    <Button type="button" size="sm" onClick={onRetry}>
                        Reintentar
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ErrorDetail;