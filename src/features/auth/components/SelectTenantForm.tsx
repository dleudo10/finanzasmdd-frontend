import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { useAuth } from "@/context/AuthContext";
import { ChevronLeftIcon } from "@/icons";
import { Link } from "react-router";

export default function SelectTenantForm() {
    const options = [
        { value: "marketing", label: "Marketing" },
        { value: "template", label: "Template" },
        { value: "development", label: "Development" },
    ];

    const {logout} = useAuth()

    return (
        <div className="flex flex-col flex-1">
            <div className="w-full max-w-md pt-10 mx-auto">
                <Link
                    onClick={logout}
                    className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    to="/signin"
                >
                    <ChevronLeftIcon className="size-5" />
                    Volver a iniciar sesión
                </Link>
            </div>
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Seleccionar empresa
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ¡Introduce tu email y contraseña para iniciar sesión!
                        </p>
                    </div>
                    <div>

                        <form>
                            <div className="space-y-6">
                                <div>
                                    <Label>
                                        Empresa <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Select
                                        options={options}
                                        placeholder="Selecciona la empesa"
                                        className="dark:bg-dark-900"
                                    />
                                </div>

                                <div>
                                    <Button className="w-full" size="sm" onClick={tenantLogin}>
                                        Continuar
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}