import { CallEffect, PutEffect, call, put } from "redux-saga/effects";
import { projectFaliure, removeProjectSuccess } from "../slices/projectSlice";

export default function* removeProjectSaga(action: { type: string; payload: { projectId: string, token: string } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, Response> {
    try {
        const response: Response = yield call(fetch, `http://localhost:8080/user/project/${action.payload.projectId}`, {
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
        yield put(removeProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(projectFaliure((error as Error).message));
    }
}