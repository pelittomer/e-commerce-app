import { useSelector } from "react-redux"
import { selectCurrentToken } from "../../modules/auth/store/authSlice"
import { jwtDecode } from "jwt-decode"

export interface UserInfo {
    userId: string;
    username: string;
    roles: RoleType;
}
export const Role = {
    Customer: "CUSTOMER",
    Seller: "SELLER",
    Admin: "ADMIN"
} as const
type RoleType = (typeof Role)[keyof typeof Role]

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    if (token) {
        const decoded: UserInfo = jwtDecode(token)
        return {
            userId: decoded.userId,
            username: decoded.username,
            roles: decoded.roles
        }
    }
    return { username: '', roles: '', userId: '' }
}

export default useAuth