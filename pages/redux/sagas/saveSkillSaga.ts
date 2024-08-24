import { SkillsType } from "@/types/SkillsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { saveSkillFaliure, saveSkillSuccess } from "../slices/skillSlice";

export default function* saveSkillSaga(action: { type: string; payload: { data: SkillsType, userId: string, token: string} }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, SkillsType> {
    try {
        const skillData: SkillsType = {
            ...action.payload.data,
            user: {
                id: action.payload.userId
            }
        };
        const response: SkillsType = yield call(() =>
            fetch('http://localhost:8080/user/skill', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Authorization': `Bearer ${action.payload.token}`,
                },
                body: JSON.stringify(skillData),
            })
        );
        if (!response.ok) {
            throw new Error((yield response.text()) as unknown as string);
        }
        const responseJson = yield response.json();
        yield put(saveSkillSuccess(responseJson));
    } catch (error: unknown) {
        yield put(saveSkillFaliure((error as Error).message));
    }
}