import { UserResponseType } from "./UserResponseType"

export type UserPortfolioState = {
    success: boolean,
    user: UserResponseType | null,
    error: Record<string,string> | null
}