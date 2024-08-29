import { AboutMeType } from "@/types/AboutMeType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { saveAboutMeFaliure, saveAboutMeSuccess } from "../slices/aboutMeSlice";

export default function* saveAboutMeSaga(action: { type: string; payload: { data: AboutMeType, userId: string, token: string, profile: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, AboutMeType> {
    try {
        const formData = new FormData();
        formData.append('aboutMeData', JSON.stringify(action.payload.data));
        formData.append('profile', action.payload.profile);
        const response: AboutMeType = yield call(() =>
            fetch('http://localhost:8080/user/aboutMe', {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${action.payload.token}`,
                },
                body: formData,
            })
        );
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        yield put(saveAboutMeSuccess(responseJson));
    } catch (error: unknown) {
        yield put(saveAboutMeFaliure((error as Error).message));
    }
}