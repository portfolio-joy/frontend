import { RegisterUserPayload } from "@/types/RegisterUserPayload";
import { registerUserFailure, registerUserSuccess } from "../slices/registerSlice";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";

export default function* registerUserSaga(action: { type: string; payload: RegisterUserPayload }): Generator<CallEffect<Response> | PutEffect<{ payload: undefined | string; type: "register/registerUserSuccess" | "register/registerUserFailure"; }> | Promise<string>, void, Response> {
    try {
        const response: Response | null = yield call(() =>
            fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(action.payload),
            })
        );
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }

        yield put(registerUserSuccess());
    } catch (error : unknown) {
        yield put(registerUserFailure((error as Error).message));
    }
}