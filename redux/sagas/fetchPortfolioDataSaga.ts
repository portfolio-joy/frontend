import { UserResponseType } from "@/types/UserResponseType";
import { CallEffect, PutEffect, put, call } from "redux-saga/effects";
import { fetchPortfolioDataFailure, fetchPortfolioDataSuccess } from "../slices/fetchUserSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";

export default function* fetchPortfolioDataSaga(action: { type: string; payload: string }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, UserResponseType> {
    const requestData = {
        method: 'GET',
        headers: CommonHeaders(),
    }
    try {
        const responseJson = yield call(ApiRequest, `/user/portfolio/${action.payload}`,requestData);
        yield put(fetchPortfolioDataSuccess(responseJson));
    } catch (error: unknown) {
        yield put(fetchPortfolioDataFailure((error as Error).message));
    }
}