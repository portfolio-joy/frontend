import { ProjectsType } from "@/types/ProjectsType";
import { call, CallEffect, put, PutEffect } from "redux-saga/effects";
import { addProjectSuccess, projectFaliure } from "../slices/projectSlice";

export default function* addProjectSaga(action: { type: string; payload: { data: ProjectsType, token: string, image: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ProjectsType> {
    try {
        const formData = new FormData();
        formData.append('projectData', JSON.stringify(action.payload.data));
        formData.append('image', action.payload.image);
        const response: ProjectsType = yield call(() =>
            fetch('http://localhost:8080/user/project', {
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
        yield put(addProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(projectFaliure((error as Error).message));
    }
}