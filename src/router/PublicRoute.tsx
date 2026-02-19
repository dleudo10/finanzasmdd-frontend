import { Navigate } from "react-router"
import { useAuth } from "@/context/AuthContext"
import FullPageLoader from "@/components/ui/loaders/FullPageLoader"

interface Props {
    children: React.ReactNode
}

const PublicRoute = ({ children }: Props) => {
    const { token, requiresTenantSelection, loading } = useAuth()

    if (loading) {
        return <FullPageLoader />
    }

    if (token && requiresTenantSelection === false) {
        return <Navigate to="/" replace />
    }

    if (token && requiresTenantSelection) {
        return <Navigate to="/select-tenant" replace />
    }

    return children
}

export default PublicRoute
