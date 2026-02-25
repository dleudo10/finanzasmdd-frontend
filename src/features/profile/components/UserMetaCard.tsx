import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import ButtonRounded from "@/components/ui/button/ButtonRounded";
import { Modal } from "@/components/ui/modal"
import { useModal } from "@/hooks/useModal";
import { EyeCloseIcon, EyeIcon, LockIcon } from "@/icons";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormPasswordPayload, UserMetaCardProps } from "../profile.types";
import { useChangePassword } from "../hooks/useChangePassword";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import Spinner from "@/components/ui/loaders/Spinner";

const UserMetaCard = (props: UserMetaCardProps) => {
    const { isOpen, openModal, closeModal } = useModal();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const { mutate, isPending } = useChangePassword();
    const { register, handleSubmit, reset, watch, setError, formState: { errors, isSubmitting } } = useForm<FormPasswordPayload>({
        shouldFocusError: true
    })
    const { handleError } = useApiError()
    const alert = useAlert()



    const onSubmit: SubmitHandler<FormPasswordPayload> = (data: FormPasswordPayload) => {
        mutate(data, {
            onSuccess: (data) => {
                reset();
                closeModal();
                alert.success("Cambio de contraseña", data.message)
            },
            onError: (error) => {
                const apiError = handleError(error)

                if (apiError.errorType === "HTTP_ERROR" && apiError.errors) {
                    Object.entries(apiError.errors).forEach(([field, messages]) => {
                        if (field !== 'non_field_errors' && field !== 'detail' && field !== 'message') {
                            setError(field as keyof FormPasswordPayload, {
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

                if (!apiError.errors) {
                    alert.error(apiError.title, errorMessage)
                    return;
                }

                if (apiError.errors.non_field_errors || apiError.errors.detail || apiError.errors.message) {
                    const message = apiError.errors.non_field_errors?.[0] || apiError.errors.detail?.[0] || apiError.errors.message?.[0] || errorMessage;
                    setError("new_password", {
                        type: "server",
                        message: message,
                    });
                    return;
                }

                console.log("Error al cambiar la contraseña:", apiError);
            },
        })
    }

    const newPassword = watch("new_password");
    const isLoading = isPending || isSubmitting;

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                        <div className="order-3 xl:order-2">
                            <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                                {capitalizeFirstLetter(props.name)} {capitalizeFirstLetter(props.lastname)}
                            </h4>
                            <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {capitalizeFirstLetter(props.role)}
                                </p>
                                <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {props.email}
                                </p>
                            </div>
                        </div>
                    </div>
                    <ButtonRounded type="button" onClick={openModal}>
                        <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                                fill=""
                            />
                        </svg>
                        contraseña
                    </ButtonRounded>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Editar contraseña
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Actualiza tu contraseña para mantener tu cuenta segura. Asegúrate de elegir una contraseña fuerte y única.
                        </p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="custom-scrollbar max-h-[320px] overflow-y-auto px-2 pb-3">
                            <div>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2">
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

                                    <div className="col-span-2">
                                        <Label>
                                            Nueva Contraseña <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            type={showNewPassword ? "text" : "password"}
                                            placeholder="Ingresa tu nueva contraseña"
                                            startIcon={<LockIcon />}
                                            endIcon={showNewPassword ? <EyeIcon aria-label="Ocultar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon aria-label="Mostrar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                            onEndIconClick={() => setShowNewPassword(!showNewPassword)}
                                            hint={errors.new_password?.message}
                                            error={!!errors.new_password}
                                            disabled={isLoading}
                                            aria-invalid={!!errors.new_password}
                                            ariaDescribedby="new_password-error"
                                            aria-busy={isLoading}
                                            autoComplete="current-password"
                                            {...register("new_password", {
                                                required: "La nueva contraseña es obligatoria",
                                                pattern: {
                                                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,                
                                                    message: "Contraseña inválida"
                                                }
                                            })}
                                        />
                                        <div>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-span-2">
                                        <Label>
                                            Repetir contraseña <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Repite tu nueva contraseña"
                                            startIcon={<LockIcon />}
                                            endIcon={showConfirmPassword ? <EyeIcon aria-label="Ocultar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" /> : <EyeCloseIcon aria-label="Mostrar contraseña" className="fill-gray-500 dark:fill-gray-400 size-5" />}
                                            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            hint={errors.confirm_password?.message}
                                            error={!!errors.confirm_password}
                                            disabled={isLoading}
                                            aria-invalid={!!errors.confirm_password}
                                            ariaDescribedby="confirm_password-error"
                                            aria-busy={isLoading}
                                            autoComplete="current-password"
                                            {...register("confirm_password", {
                                                required: "Repetir la contraseña es obligatorio",
                                                validate: value => value === newPassword || "Las contraseñas no coinciden"
                                            })}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button
                                size="sm"
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    reset();
                                    closeModal();
                                }}
                                disabled={isLoading}
                                aria-busy={isLoading}
                            >
                                Cancelar
                            </Button>
                            <Button size="sm" type="submit" disabled={isLoading} aria-busy={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Guardar cambios'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UserMetaCard
