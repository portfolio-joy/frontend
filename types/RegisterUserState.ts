import { RegisterUserPayload } from "./RegisterUserPayload";

export type RegisterUserState = {
    success: boolean;
    data: RegisterUserPayload | null;
    error: string | null;
}
