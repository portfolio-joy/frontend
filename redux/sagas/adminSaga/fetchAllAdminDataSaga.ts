import { adminSuccess } from "@/redux/slices/adminSlice";
import { setErrors } from "@/redux/slices/errorSlice";
import { AdminResponseData } from "@/types/AdminResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import ApiRequest from "@/util/api";
import { CommonHeaders } from "@/util/headers";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";

export default function* fetchAllAdminDataSaga(action: { type: string; payload: { token: string | null } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, AdminResponseData> {
    const requestData: RequestInit = {
        method: 'GET',
        headers: {
            ...CommonHeaders(),
            ...(action.payload.token && { 'Authorization': `Bearer ${action.payload.token}` }),
        },
    }
    try {
        const responseJson = yield call(ApiRequest,
            '/admin/all',
            requestData
        );
        yield put(adminSuccess(responseJson));
    } catch (error: unknown) {
        console.log((error as Error).message);
        yield put(setErrors((error as Error).message));
    }
}