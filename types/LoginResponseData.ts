export interface LoginResponseData extends Response {
    id : string | null,
    token : string | null,
    expiresIn : Date
}