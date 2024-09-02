import { LoginResponseData } from "../types/LoginResponseData"
import { LoginUserPayload } from "../types/LoginUserPayload"

export type LoginUserState = {
    success : boolean,
    data : LoginResponseData | null
}