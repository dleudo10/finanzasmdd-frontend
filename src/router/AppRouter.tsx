import { BrowserRouter, Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { ScrollToTop } from "../components/common/ScrollToTop";
import AppLayout from "../layout/AppLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoute from "./PublicRoute";
import FullPageLoader from "@/components/ui/loaders/FullPageLoader";

const SignIn = lazy(() => import("@/features/auth").then(module => ({ default: module.SignIn })))
const SelectTenant = lazy(() => import("@/features/auth").then(module => ({ default: module.SelectTenant })))
const Profile = lazy(() => import("@/features/profile").then(module => ({ default: module.Profile })))
const NotFound = lazy(() => import("@/pages/NotFound"))
const Category = lazy(() => import("@/features/categories").then(module => ({ default: module.Category })))
const CategoryDetails = lazy(() => import("@/features/categories").then(module => ({ default: module.CategoryDetails })))
const ListPrice = lazy(() => import("@/features/ListPrice").then(module => ({ default: module.ListPrice })))
const ListPriceDetail = lazy(() => import("@/features/ListPrice").then(module => ({ default: module.ListPriceDetail })))
const Warehouse = lazy(() => import("@/features/warehouse").then(module => ({ default: module.Warehouse })))
const WarehouseDetail = lazy(() => import("@/features/warehouse").then(module => ({ default: module.WarehouseDetail })))

// PAGINAS DE PRUEBA
import UserProfiles from "../pages/UserProfiles";
import { Roles } from "@/features/roles";
import BasicTables from "@/pages/Tables/BasicTables";
import FormElements from "@/pages/Forms/FormElements";
// import { ListPrice } from "@/features/ListPrice";
// import CategoryDetails from "@/features/categories/pages/CategoryDetails";


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

                            <Route path="/profile" element={
                                <ProtectedRoutes>
                                    <Profile />
                                </ProtectedRoutes>
                            } />

                            <Route path="/roles" element={
                                <ProtectedRoutes>
                                    <Roles />
                                </ProtectedRoutes>
                            } />

                            <Route path="/categories" element={
                                <ProtectedRoutes>
                                    <Category />
                                </ProtectedRoutes>
                            } />

                            <Route path="/categories/:id/details" element={
                                <ProtectedRoutes>
                                    <CategoryDetails />
                                </ProtectedRoutes>
                            } />

                            <Route path="/list-price" element={
                                <ProtectedRoutes>
                                    <ListPrice />
                                </ProtectedRoutes>
                            } />

                            <Route path="/list-price/:id/details" element={
                                <ProtectedRoutes>
                                    <ListPriceDetail />
                                </ProtectedRoutes>
                            } />

                            <Route path="/warehouse" element={
                                <ProtectedRoutes>
                                    <Warehouse />
                                </ProtectedRoutes>
                            } />

                            <Route path="/warehouse/:id/details" element={
                                <ProtectedRoutes>
                                    <WarehouseDetail />
                                </ProtectedRoutes>
                            } />


                            {/* páginas de prueba*/}
                            <Route path="/prueba/profile" element={
                                <ProtectedRoutes>
                                    <UserProfiles />
                                </ProtectedRoutes>
                            } />

                            <Route path="/form-elements" element={<FormElements />} />


                            <Route path="/basic-tables" element={<BasicTables />} />



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

                        {/* Page not found */}
                        <Route path="*" element={<NotFound />} />


                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    )
}

export default AppRouter