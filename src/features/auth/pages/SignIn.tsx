import PageMeta from "@/components/common/PageMeta";
import AuthLayout from "../components/AuthPageLayout";
import SignInForm from "../components/SignInForm";


export function SignIn() {
    return (
        <>
            <PageMeta
                title="Iniciar Sesión | Finanzas MDD"
                description="Accede de forma segura a la plataforma de Finanzas MDD para administrar usuarios, roles y operaciones financieras."
            />
            <AuthLayout>
                <SignInForm />
            </AuthLayout>
        </>
    )
}