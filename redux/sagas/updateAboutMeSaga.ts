import { AboutMeType } from "@/types/AboutMeType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import {aboutMeFaliure, aboutMeSuccess } from "../slices/aboutMeSlice";
import { CommonHeaders } from "@/util/headers";
import ApiRequest from "@/util/api";
import { setErrors } from "../slices/errorSlice";

export default function* updateAboutMeSaga(action: { type: string; payload: { data: AboutMeType, aboutMeId: string, token: string, profile: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, AboutMeType> {
    const formData = new FormData();
    formData.append('aboutMeData', JSON.stringify(action.payload.data));
    formData.append('profile', action.payload.profile);
    const requestData: RequestInit = {
        method: 'PUT',
        headers: {
            ...CommonHeaders(),
            'Authorization': `Bearer ${action.payload.token}`,
        },
        body: formData,
    }
    try {
        const responseJson = yield call(ApiRequest,`/user/aboutMe/${action.payload.aboutMeId}`,requestData);
        yield put(aboutMeSuccess(responseJson));
    } catch (error: unknown) {
        yield put(setErrors((error as Error).message));
    }
}