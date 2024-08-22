import { AboutMeType } from "./AboutMeType"
import { UserResponseType } from "./UserResponseType"

export type UserPortfolioState = {
    success: boolean,
    user: UserResponseType | null,
    error: string | null
}