import { LoginResponseData } from "@/types/LoginResponseData";
import { LoginUserPayload } from "@/types/LoginUserPayload";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { loginUserFailure, loginUserSuccess } from "../slices/loginSlice";

export default function* loginUserSaga(action: { type: string; payload: LoginUserPayload }): Generator<CallEffect<Response> | PutEffect<{ payload: LoginResponseData | string; type: "login/loginUserSuccess" | "login/loginUserFailure"; }> | Promise<string>, void, LoginResponseData> {
    try {
        const response: LoginResponseData | null = yield call(fetch, 'http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            body: JSON.stringify(action.payload),
        });
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        yield put(loginUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(loginUserFailure((error as Error).message));
    }
}