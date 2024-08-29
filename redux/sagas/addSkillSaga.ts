import { SkillsType } from "@/types/SkillsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addSkillSuccess, addSkillFaliure } from "../slices/skillSlice";

export default function* addSkillSaga(action: { type: string; payload: { data: SkillsType, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SkillsType> {
    try {
        const response: SkillsType = yield call(fetch, 'http://localhost:8080/user/skill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Authorization': `Bearer ${action.payload.token}`,
            },
            body: JSON.stringify(action.payload.data),
        });
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        yield put(addSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(addSkillFaliure((error as Error).message));
    }
}