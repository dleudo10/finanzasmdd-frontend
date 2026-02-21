import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import UserMetaCard from "../components/UserMetaCard";
import UserInfoCard from "../components/UserInfoCard";
import { useProfileMe } from "../hooks/useProfileMe";
import UserRoleCard from "../components/UserRoleCard";
import PlaceholderProfile from "../components/PlaceholderProfile";
import { useEffect } from "react";
import useApiError from "@/hooks/useApiError";
import { useAlert } from "@/hooks/useAlert";
import ErrorProfile from "../components/ErrorProfile";

export function Profile() {
    const { data, isLoading, error, refetch } = useProfileMe()
    const { handleError } = useApiError()
    const alert = useAlert()


    useEffect(() => {
        if (error) {
            const apiError = handleError(error)

            const errorMessage =
                apiError.message ||
                apiError.description ||
                "Ha ocurrido un error desconocido.";

            alert.error(apiError.title, errorMessage)
        }
    }, [error, data]);

    if (isLoading) {
        return (
            <>
                <PageMeta
                    title="Perfil | Finanzas MDD"
                    description="Página de perfil del usuario en Finanzas MDD"
                />

                <PageBreadcrumb pageTitle="Perfil" />

                <PlaceholderProfile />
            </>
        )
    }

    if (!data?.success) {
        return (
            <>
                <PageMeta
                    title="Perfil | Finanzas MDD"
                    description="Página de perfil del usuario en Finanzas MDD"
                />

                <PageBreadcrumb pageTitle="Perfil" />

                <ErrorProfile
                    message={"No pudimos cargar la información del perfil."}
                    onRetry={refetch}
                />
            </>
        )
    }

    return (
        <>
            <PageMeta
                title="Perfil | Finanzas MDD"
                description="Página de perfil del usuario en Finanzas MDD"
            />

            <PageBreadcrumb pageTitle="Perfil" />

            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Perfil
                </h3>
                <div className="space-y-6">
                    <UserMetaCard
                        name={data.data.name}
                        lastname={data.data.lastname}
                        email={data.data.email}
                        role={data.data.role}
                    />
                    <UserInfoCard
                        name={data.data.name}
                        lastname={data.data.lastname}
                        email={data.data.email}
                        phone={data.data.phone}
                        document_type={data.data.document_type}
                        document_number={data.data.document_number}
                    />
                    <UserRoleCard />
                </div>
            </div>
        </>
    )
}
