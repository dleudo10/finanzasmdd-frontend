import { useModal } from "@/hooks/useModal";
import { FormUserInfo, UserInfoCardProps } from "../profile.types";
import capitalizeFirstLetter from "@/helpers/capitalizeFirstLetter";
import Button from "@/components/ui/button/Button";
import Spinner from "@/components/ui/loaders/Spinner";
import { Modal } from "@/components/ui/modal";
import { SubmitHandler, useForm } from "react-hook-form";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import { PhoneIcon } from "@/icons";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useUpdateInfo } from "../hooks/useUpdateInfo";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";



const UserInfoCard = (props: UserInfoCardProps) => {
    const { isOpen, openModal, closeModal } = useModal();
    const { mutate, isPending } = useUpdateInfo()
    const { handleError } = useApiError()
    const alert = useAlert()
    const queryClient = useQueryClient();
    const { setUser } = useAuth()
    const { register, handleSubmit, reset, setError, formState: { errors, isSubmitting, isDirty } } = useForm({
        shouldFocusError: true,
        defaultValues: {
            name: props.name,
            lastname: props.lastname,
            phone: props.phone,
        },
    })

    useEffect(() => {
        reset({
            name: props.name,
            lastname: props.lastname,
            phone: props.phone,
        });
    }, [props.name, props.lastname, props.phone, reset]);


    const onSubmit: SubmitHandler<FormUserInfo> = (data: FormUserInfo) => {
        mutate(data, {
            onSuccess: (data) => {
                if (!data.success) return;

                reset()
                closeModal()
                queryClient.invalidateQueries({ queryKey: ['profile'], exact: false });
                setUser((prev) => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        name: data.data.name,
                        lastname: data.data.lastname,
                    };
                });
                alert.success("Editar perfil", data.message)

            },
            onError: (error) => {
                const apiError = handleError(error)

                if (apiError.errorType === "HTTP_ERROR" && apiError.errors) {
                    Object.entries(apiError.errors).forEach(([field, messages]) => {
                        if (field !== 'non_field_errors' && field !== 'detail' && field !== 'message') {
                            setError(field as keyof FormUserInfo, {
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
            }
        })
    }

    const isLoading = isPending || isSubmitting;

    return (
        <>
            <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                            Información Personal
                        </h4>

                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Nombre
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {capitalizeFirstLetter(props.name)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Apellido
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {capitalizeFirstLetter(props.lastname)}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Correo electronico
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {props.email}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Telefono
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {props.phone}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                                    Documento
                                </p>
                                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                                    {props.document_type} {props.document_number}
                                </p>
                            </div>

                        </div>
                    </div>

                    <button
                        onClick={openModal}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
                    >
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
                        Editar
                    </button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px] m-4">
                <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                    <div className="px-2 pr-14">
                        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                            Editar información básica
                        </h4>
                        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                            Mantén tu información actualizada. Algunos datos están protegidos y no pueden editarse.
                        </p>
                    </div>
                    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                        <div className="custom-scrollbar max-h-[320px] overflow-y-auto px-2 pb-3">
                            <div>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                                    <div className="col-span-2">
                                        <Label htmlFor="password">
                                            Nombre <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="Ingresa tu nombre"
                                            hint={errors.name?.message}
                                            error={!!errors.name}
                                            disabled={isLoading}
                                            aria-invalid={!!errors.name}
                                            ariaDescribedby="name-error"
                                            aria-busy={isLoading}
                                            autoComplete="current-name"
                                            {...register("name", {
                                                required: "El nombre es obligatorio",
                                                minLength: {
                                                    value: 3,
                                                    message: "Minimo 3 caracteres"
                                                },
                                            })}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>
                                            Apellido <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            id="lastname"
                                            type="text"
                                            placeholder="Ingresa tu apellido"
                                            hint={errors.lastname?.message}
                                            error={!!errors.lastname}
                                            disabled={isLoading}
                                            aria-invalid={!!errors.lastname}
                                            ariaDescribedby="lastname-error"
                                            aria-busy={isLoading}
                                            autoComplete="current-lastname"
                                            {...register("lastname", {
                                                required: "El apellido es obligatorio",
                                                minLength: {
                                                    value: 3,
                                                    message: "Minimo 3 caracteres"
                                                },
                                            })}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <Label>
                                            Telefono <span className="text-error-500">*</span>{" "}
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="text"
                                            placeholder="Ingresa tu telefono"
                                            startIcon={<PhoneIcon />}
                                            hint={errors.phone?.message}
                                            error={!!errors.phone}
                                            disabled={isLoading}
                                            aria-invalid={!!errors.phone}
                                            ariaDescribedby="phone-error"
                                            aria-busy={isLoading}
                                            autoComplete="current-phone"
                                            {...register("phone", {
                                                required: "El telefono es obligatorio",
                                                validate: (value) => {
                                                    const phone = parsePhoneNumberFromString(value, "CO");
                                                    return phone?.isValid() || "Número de teléfono inválido";
                                                },
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
                            <Button size="sm" type="submit" disabled={!isDirty || isLoading} aria-busy={isLoading}>
                                {isLoading ? <Spinner size="sm" /> : 'Guardar cambios'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    )
}

export default UserInfoCard 
