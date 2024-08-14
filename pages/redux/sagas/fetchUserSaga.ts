import { UserResponseType } from "@/types/UserResponseType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { LoginResponseData } from "@/types/LoginResponseData";
import { fetchUserFailure, fetchUserSuccess } from "../slices/fetchUserSlice";

export default function* fetchUserSaga(action: { type: string; payload: LoginResponseData }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, UserResponseType> {
    try {
        const response: UserResponseType = yield call(() => {
            return fetch(`http://localhost:8080/user/${action.payload.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${action.payload.token}`
                }
            })
        }
        );
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        yield put(fetchUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(fetchUserFailure((error as Error).message));
    }
}