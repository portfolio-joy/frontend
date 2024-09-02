import { UserResponseType } from "../types/UserResponseType"

export type UserPortfolioState = {
    success: boolean,
    user: UserResponseType | null,
    token: string | null
 }