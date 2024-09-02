import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { CallEffect, PutEffect, put, call } from "redux-saga/effects";
import { fetchUserFailure, fetchUserSuccess } from "../slices/fetchUserSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";

export default function* fetchUserSaga(action: { type: string; payload: LoginResponseData }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, UserResponseType> {
    const requestData: RequestInit = {
        method: 'GET',
        headers: {
            ...CommonHeaders(),
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${action.payload.token}`,
        },
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/${action.payload.id}`, requestData);
        yield put(fetchUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(fetchUserFailure((error as Error).message));
    }
}