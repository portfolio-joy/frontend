import { LoginResponseData } from "./LoginResponseData"
import { LoginUserPayload } from "./LoginUserPayload"

export type LoginUserState = {
    success : boolean,
    data : LoginResponseData | null,
    error : Record<string,string> | null
}