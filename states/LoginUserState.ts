import { LoginResponseData } from "../types/LoginResponseData"

export type LoginUserState = {
    success : boolean,
    data : LoginResponseData | null
}