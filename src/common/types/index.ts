export const Role = {
    Customer: "customer",
    Seller: "seller",
    Admin: "admin",
} as const
export type RoleType = (typeof Role)[keyof typeof Role]