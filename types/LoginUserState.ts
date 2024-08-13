import { LoginResponseData } from "./LoginResponseData"
import { LoginUserPayload } from "./LoginUserPayload"

export type LoginUserState = {
    success : boolean,
    data : LoginUserPayload | LoginResponseData | null,
    error : string | null
}