import Input from "@/components/form/input/InputField"
import Label from "@/components/form/Label"
import Button from "@/components/ui/button/Button";
import Spinner from "@/components/ui/loaders/Spinner";
import { SubmitHandler, useForm } from "react-hook-form";
import TextArea from "@/components/form/input/TextArea";
import Radio from "@/components/form/input/Radio";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import { CategoryFormProps, CategoryPayload } from "../../categories.types";
import { useSaveCategory } from "../../hooks/useSaveCategory";

const CategoryForm = ({ instance, closeModal }: CategoryFormProps) => {

    const { handleError } = useApiError()

    const { register, handleSubmit, reset, setValue, watch, setError, formState: { errors, isSubmitting, isDirty } } = useForm<CategoryPayload>({
        shouldFocusError: true,
        defaultValues: {
            category: instance?.category || "",
            description: instance?.description || "",
            is_active: instance?.is_active ?? true,
        },
    })
    const valueIsActive = watch('is_active')
    const { mutate, isPending } = useSaveCategory()
    const alert = useAlert()


    const onSubmit: SubmitHandler<CategoryPayload> = (data: CategoryPayload) => {
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
                            setError(field as keyof CategoryPayload, {
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
                    {instance ? "Editar información de la categoría" : "Crear nueva categoría"}
                </h4>
                <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                    {instance ? "Mantén la información de esta categoría actualizada." : "Agrega una nueva categoría para tus productos."}
                </p>
            </div>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <div className="custom-scrollbar max-h-[320px] overflow-y-auto px-2 pb-3">
                    <div>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                            <div className="col-span-2">
                                <Label htmlFor="category">
                                    Categoria <span className="text-error-500">*</span>{" "}
                                </Label>
                                <Input
                                    id="category"
                                    type="text"
                                    placeholder="Ingresa la categoria"
                                    hint={errors.category?.message}
                                    error={!!errors.category}
                                    disabled={isLoading}
                                    aria-invalid={!!errors.category}
                                    ariaDescribedby="category-error"
                                    aria-busy={isLoading}
                                    autoComplete="current-category"
                                    {...register("category", {
                                        required: "La categoría es obligatoria",
                                        minLength: {
                                            value: 3,
                                            message: "Minimo 3 caracteres"
                                        },
                                    })}
                                />
                            </div>

                            <div className="col-span-2">
                                <Label htmlFor="description">Description</Label>
                                <TextArea
                                    id="description"
                                    placeholder="Descripción de la categoría"
                                    rows={6}
                                    disabled={isLoading}
                                    error={!!errors.description}
                                    hint={errors.description?.message}
                                    aria-invalid={!!errors.description}
                                    aria-busy={isLoading}
                                    {...register("description", {
                                        minLength: {
                                            value: 10,
                                            message: "Minimo 10 caracteres"
                                        }
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
                                category: instance?.category || "",
                                description: instance?.description || "",
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

export default CategoryForm
