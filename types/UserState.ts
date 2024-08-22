import { LoginResponseData } from "./LoginResponseData"
import { UserResponseType } from "./UserResponseType"

export type UserState = {
    success : boolean,
    data :  UserResponseType | null,
    error : string | null
}