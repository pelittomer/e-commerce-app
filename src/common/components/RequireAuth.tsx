import { Navigate, Outlet, useLocation } from "react-router"
import useAuth from "../hooks/useAuth"
const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { roles } = useAuth()
    const content = (
        roles === allowedRoles
            ? <Outlet />
            : <Navigate to="/auth/customer/sign-in" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth