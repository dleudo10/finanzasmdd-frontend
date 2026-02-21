import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EnvelopeIcon, EyeCloseIcon, EyeIcon, LockIcon } from "@/icons";
import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { SubmitHandler, useForm } from "react-hook-form"
import { LoginPayload } from "../auth.types";
import { Link } from "react-router";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import { createWhatsappUrl, defaultWhatsappMessage } from "@/helpers/contact";
import Spinner from "@/components/ui/loaders/Spinner";

export default function SignInForm() { 
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { mutate, isPending } = useLogin();
    const { handleError } = useApiError()
    const [globalError, setGlobalError] = useState<string | null>(null);
    const alert = useAlert()
    
    // Formulario
    const { register, handleSubmit, clearErrors, setError, formState: { errors, isSubmitting } } = useForm<LoginPayload>({
        shouldFocusError: true // Se enfoca automáticamente en el primer campo con error al enviar el formulario
    });
    

    // Envio de datos
    const onSubmit: SubmitHandler<LoginPayload> = (data) => {
        setGlobalError(null);
        clearErrors();

        mutate(data, {
            onError: (error) => {
                const apiError = handleError(error)

                if (apiError.errorType === "HTTP_ERROR" && apiError.errors) {
                    Object.entries(apiError.errors).forEach(([field, messages]) => {
                        if (field !== 'non_field_errors' && field !== 'detail' && field !== 'message') {
                            setError(field as keyof LoginPayload, {
                                type: "server",
                                message: Array.isArray(messages) ? messages.join(" ") : String(messages)
                            });
                        }
                    })
                }

                const errorMessage =
                    apiError.message ||
                    apiError.description ||
                    "Ha ocurrido un error desconocido.";

                if(!apiError.errors){
                    alert.error(apiError.title, errorMessage)
                    return;
                }

                
                if (apiError.errors.non_field_errors || apiError.errors.detail || apiError.errors.message) {
                    const message = apiError.errors.non_field_errors?.[0] || apiError.errors.detail?.[0] || apiError.errors.message?.[0] || errorMessage;
                    setGlobalError(message);
                    return;
                }
            
            }
        })
    }

    const isLoading = isSubmitting || isPending;

    const whatsappUrl = createWhatsappUrl(defaultWhatsappMessage)


    return (
        <div className="flex flex-col flex-1">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Iniciar Sesión
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ¡Introduce tu email y contraseña para iniciar sesión!
                        </p>
                    </div>
                    <div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="email">
                                        Correo electronico <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input
                                        id="email"
                                        placeholder="info@gmail.com"
                                        startIcon={<EnvelopeIcon />}
                                        hint={errors.email?.message}
                                        error={!!errors.email}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.email}
                                        ariaDescribedby="email-error"
                                        aria-busy={isLoading}
                                        autoComplete="email"
                                        {...register("email", {
                                            required: "El correo es obligatorio",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Correo inválido"
                                            }
                                        })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">
                                        Contraseña <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ingresa tu contraseña"
                                        startIcon={<LockIcon />}
                                        endIcon={showPassword ? <EyeIcon aria-label="Ocultar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon aria-label="Mostrar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                        onEndIconClick={() => setShowPassword(!showPassword)}
                                        hint={errors.password?.message}
                                        error={!!errors.password}
                                        disabled={isLoading}
                                        aria-invalid={!!errors.password}
                                        ariaDescribedby="password-error"
                                        aria-busy={isLoading}
                                        autoComplete="current-password"
                                        {...register("password", {
                                            required: "La contraseña es obligatoria",
                                        })}
                                        
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    >
                                        Recuperar contraseña?
                                    </Link>
                                </div>
                                <div>
                                    <Button type="submit" className="w-full" size="sm" disabled={isLoading} aria-busy={isLoading}>
                                        {isLoading ? <Spinner size="md" /> : 'Iniciar sesión'}
                                    </Button>
                                </div>
                            </div>
                        </form>

                        <div className="mt-5">
                            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                                ¿No tienes cuenta? {""}
                                <a
                                    href={`${whatsappUrl}`}
                                    className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Solicita acceso
                                </a>
                            </p>
                        </div>

                        {globalError && <div className="mt-5 w-full flex items-center justify-center">
                            <p role="alert" className="text-sm font-normal text-center text-red-700 dark:text-gray-400 sm:text-start">
                                {globalError}
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}