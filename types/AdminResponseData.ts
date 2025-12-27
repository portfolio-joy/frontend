import { AdminRoleData } from "./AdminRoleData"
import { AdminUserData } from "./AdminUserData"

export type AdminResponseData = {
    users: AdminUserData[],
    roles: AdminRoleData[]
}