import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button";
import Spinner from "@/components/ui/loaders/Spinner";
import { SubmitHandler, useForm } from "react-hook-form";
import Radio from "@/components/form/input/Radio";
import { useAlert } from "@/hooks/useAlert";
import useApiError from "@/hooks/useApiError";
import { WarehouseFormProps, WarehousePayload } from "../../warehouse.types";
import { useSaveWarehouse } from "../../hooks/useSaveWarehouse";
import TextArea from "@/components/form/input/TextArea";

const WarehouseForm = ({ instance, closeModal }: WarehouseFormProps) => {

    const { handleError } = useApiError()

    const { register, handleSubmit, reset, setValue, watch, setError, formState: { errors, isSubmitting, isDirty } } = useForm<WarehousePayload>({
        shouldFocusError: true,
        defaultValues: {
            name: instance?.name || "",
            location: instance?.location || "",
            observations: instance?.observations || "",
            is_active: instance?.is_active ?? true,
        },
    })
    const valueIsActive = watch('is_active')
    const { mutate, isPending } = useSaveWarehouse()
    const alert = useAlert()


    const onSubmit: SubmitHandler<WarehousePayload> = (data: WarehousePayload) => {
        mutate({ id: instance?.id, payload: data }, {
            onSuccess: (data) => {
                reset()
                closeModal()
                alert.success(
                    instance ? "Actualizado" : "Creado",
                    data.message
                )
            },
            onError: (error) => {
                const apiError = handleError(error)

                if (apiError.errorType === "HTTP_ERROR" && apiError.errors) {
                    Object.entries(apiError.errors).forEach(([field, messages]) => {
                        if (
                            field !== "non_field_errors" &&
                            field !== "detail" &&
                            field !== "message"
                        ) {
                            setError(field as keyof WarehousePayload, {
                                type: "server",
                                message: Array.isArray(messages)
                                    ? messages.join(" ")
                                    : String(messages),
                            })
                        }
                    })
                } else {
                    alert.error(
                        apiError.title,
                        apiError.message || "Error desconocido"
                    )
                }
            },
        })
    }


    const isLoading = isPending || isSubmitting;


    return (
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                    {instance ? "Editar información de la bodega" : "Nueva bodega"}
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    {instance
                        ? "Actualiza los detalles de esta bodega para mantener tus productos al día."
                        : "Crea una nueva bodega para organizar la venta de tus productos."}                </p>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="custom-scrollbar max-h-[320px] overflow-y-auto px-2 pb-3">
                    <div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2">
                                <Label htmlFor="category">
                                    Nombre <span className="text-error-500">*</span>{" "}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ingresa el nombre"
                                    hint={errors.name?.message}
                                    error={!!errors.name}
                                    disabled={isLoading}
                                    aria-invalid={!!errors.name}
                                    ariaDescribedby="name-error"
                                    aria-busy={isLoading}
                                    autoComplete="current-name"
                                    {...register("name", {
                                        required: "El nombre es obligatoria",
                                        minLength: {
                                            value: 3,
                                            message: "Minimo 3 caracteres"
                                        },
                                    })}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="location">
                                    Ubicacion <span className="text-error-500">*</span>{" "}
                                </Label>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="Ingresa la ubicación"
                                    hint={errors.location?.message}
                                    error={!!errors.location}
                                    disabled={isLoading}
                                    aria-invalid={!!errors.location}
                                    ariaDescribedby="location-error"
                                    aria-busy={isLoading}
                                    autoComplete="current-location"
                                    {...register("location", {
                                        minLength: {
                                            value: 3,
                                            message: "Minimo 3 caracteres"
                                        },
                                    })}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="observations">
                                    Observaciones <span className="text-error-500">*</span>{" "}
                                </Label>
                                <TextArea
                                    id="observations"
                                    placeholder="Ingresa tus observaciones"
                                    hint={errors.observations?.message}
                                    error={!!errors.observations}
                                    disabled={isLoading}
                                    aria-invalid={!!errors.observations}
                                    aria-busy={isLoading}
                                    {...register("observations", {
                                        minLength: {
                                            value: 10,
                                            message: "Minimo 10 caracteres"
                                        },
                                    })}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label>
                                    Estado <span className="text-error-500">*</span>{" "}
                                </Label>
                                <div className="flex flex-wrap items-center gap-8">
                                    <Radio
                                        id="isActive1"
                                        name="is_active"
                                        value="true"
                                        checked={valueIsActive === true}
                                        disabled={isLoading}
                                        onChange={(value) => setValue("is_active", value === "true")}
                                        label="Activo"
                                    />
                                    <Radio
                                        id="isActive2"
                                        name="is_active"
                                        value="false"
                                        checked={valueIsActive === false}
                                        disabled={isLoading}
                                        onChange={(value) => setValue("is_active", value === "true")}
                                        label="Inactivo"
                                    />
                                </div>
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
                            reset({
                                name: instance?.name || "",
                                location: instance?.location || "",
                                observations: instance?.observations || "",
                                is_active: instance?.is_active ?? true,
                            });
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
    )
}

export default WarehouseForm
