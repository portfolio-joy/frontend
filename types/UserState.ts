import { UserType } from "./UserType"

export type UserState = {
    success : boolean,
    data : UserType,
    error : string
}