export interface LoginResponseData extends Response {
    id : string,
    token : string,
    expiresIn : number
}