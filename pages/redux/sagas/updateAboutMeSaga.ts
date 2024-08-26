import { AboutMeType } from "@/types/AboutMeType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { updateAboutMeSuccess, updateAboutMeFaliure } from "../slices/aboutMeSlice";

export default function* updateAboutMeSaga(action: { type: string; payload: { data: AboutMeType, aboutMeId: string, userId: string, token: string, profile: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, AboutMeType> {
    try {
        const aboutMeData: AboutMeType = {
            ...action.payload.data,
            user: {
                id: action.payload.userId
            }
        };
        const formData = new FormData();
        formData.append('aboutMeData', JSON.stringify(aboutMeData));
        formData.append('profile', action.payload.profile);
        const response: AboutMeType = yield call(() =>
            fetch(`http://localhost:8080/user/aboutMe/${action.payload.aboutMeId}`, {
                method: 'PUT',
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
        yield put(updateAboutMeSuccess(responseJson));
    } catch (error: unknown) {
        yield put(updateAboutMeFaliure((error as Error).message));
    }
}