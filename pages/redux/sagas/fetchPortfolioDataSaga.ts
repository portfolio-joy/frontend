import { LoginResponseData } from "@/types/LoginResponseData";
import { UserResponseType } from "@/types/UserResponseType";
import { CallEffect, PutEffect, put, call } from "redux-saga/effects";
import { base64ToFile } from "@/util/base64ToFile";
import { ImageType } from "@/types/ImageType";
import { fetchPortfolioDataFailure, fetchPortfolioDataSuccess } from "../slices/fetchPortfolioDataSlice";

export default function* fetchPortfolioDataSaga(action: { type: string; payload: string }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, any> {
    try {
        const response: Response = yield call(fetch, `http://localhost:8080/user/portfolio/${action.payload}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
        });

        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }

        const responseJson: UserResponseType = yield call([response, 'json']);
        if(responseJson.aboutMe?.profile) responseJson.aboutMe.profile = base64ToFile(responseJson.aboutMe.profile as ImageType);
        yield put(fetchPortfolioDataSuccess(responseJson));
    } catch (error: unknown) {
        yield put(fetchPortfolioDataFailure((error as Error).message));
    }
}