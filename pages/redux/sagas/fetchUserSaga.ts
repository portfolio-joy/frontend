import { UserResponseType } from "@/types/UserResponseType";
import { useSelector } from "react-redux";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { RootState } from "../store";
import { LoginResponseData } from "@/types/LoginResponseData";
import { fetchUserData, fetchUserFailure, fetchUserSuccess } from "../slices/fetchUserSlice";

export default function* fetchUserSaga(): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, UserResponseType> {
    try {
        const data  = useSelector((state: RootState) => state.login.data) as LoginResponseData
        const response : UserResponseType = yield call(() =>
            fetch(`http://localhost:8080/user/${data.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${data.token}`
                }
            })
        );
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        console.log(responseJson);
        yield put(fetchUserSuccess(responseJson));
    } catch (error: unknown) {
        yield put(fetchUserFailure((error as Error).message));
    }
}