import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
// import { SignIn } from "@/features/auth";
// import { SelectTenant } from "@/features/auth";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import FullPageLoader from "@/components/ui/loaders/FullPageLoader";

const SignIn = lazy(() => import("@/features/auth").then(module => ({ default: module.SignIn })))
const SelectTenant = lazy(() => import("@/features/auth").then(module => ({ default: module.SelectTenant })))

const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Suspense fallback={<FullPageLoader />}>
                    <Routes>
                        {/* Dashboard layout */}
                        <Route element={<AppLayout />}>
                            <Route path="/" element={
                                <ProtectedRoutes>
                                    <p>Inicio</p>
                                </ProtectedRoutes>}
                            />
                        </Route>

                        {/* Auth Layout */}
                        <Route path="/signin" element={
                            <PublicRoute>
                                <SignIn />
                            </PublicRoute>
                        } />
                        <Route path="/select-tenant" element={
                            <PublicRoute>
                                <SelectTenant />
                            </PublicRoute>
                        } />

                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default AppRouter