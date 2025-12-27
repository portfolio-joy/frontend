import { AdminResponseData } from "../AdminResponseData"

export type AdminState = {
    success: boolean,
    data: AdminResponseData | null 
}