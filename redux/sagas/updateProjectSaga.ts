import { ProjectsType } from "@/types/ProjectsType";
import { projectFaliure, updateProjectSuccess } from "../slices/projectSlice";
import { CallEffect, PutEffect, call, put } from "redux-saga/effects";

export default function* updateProjectSaga(action: { type: string; payload: { data: ProjectsType, projectId: string, token: string, image: File } }): Generator<CallEffect<Response> | PutEffect | Promise<string>, void, ProjectsType> {
    try {
        const formData = new FormData();
        formData.append('projectData', JSON.stringify(action.payload.data));
        formData.append('image', action.payload.image);
        const response: ProjectsType = yield call(() =>
            fetch(`http://localhost:8080/user/project/${action.payload.projectId}`, {
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
        yield put(updateProjectSuccess(responseJson));
    } catch (error: unknown) {
        yield put(projectFaliure((error as Error).message));
    }
}