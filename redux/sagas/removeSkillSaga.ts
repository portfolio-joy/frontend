import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { removeSkillFaliure, removeSkillSuccess } from "../slices/skillSlice";

export default function* removeSkillSaga(action: { type: string; payload: { skillId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, Response> {
    try {
        const response: Response = yield call(fetch, `http://localhost:8080/user/skill/${action.payload.skillId}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Authorization': `Bearer ${action.payload.token}`,
            }
        });
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = (yield response.text()) as unknown as string;
        yield put(removeSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(removeSkillFaliure((error as Error).message));
    }
}
