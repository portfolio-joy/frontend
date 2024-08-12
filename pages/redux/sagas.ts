import { call, CallEffect, put, PutEffect, takeEvery } from 'redux-saga/effects';
import { registerUserSuccess, registerUserFailure, registerUser } from "./slices/registerSlice"
import { RegisterUserPayload } from "./slices/registerSlice"

interface RegisterUserResponse extends Response {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    emailId: string;
    username: string;
    password: string;
    portfolioUrl: string;
    token: string;
    aboutMe: any;
    allSkill: any[];
    allProject: any[];
    allTestimonial: any[];
    contact: any;
    allSocialMedia: any[];
}

function* registerUserSaga(action: { type: string; payload: RegisterUserPayload }): Generator<CallEffect<Response> | PutEffect<any> | Promise<any>, void, RegisterUserResponse> {
    try {
        // Perform the API call
        console.log(action.payload);
        const response: RegisterUserResponse = yield call(() =>
            fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                body: JSON.stringify(action.payload),
            })
        );
        if (!response.ok) {
            console.log("Reached Error typeof response");
            throw new Error((yield response.text()) as unknown as string);
        }

        // Parse the JSON response
        const result : RegisterUserResponse | string = yield response.json();
        console.log("Reached Ok");
        console.log(result);
        yield put(registerUserSuccess(result));
    } catch (error : unknown) {
        console.log("Reached Error");
        console.log(error);
        yield put(registerUserFailure((error as Error).message));
    }
}


function* rootSaga() {
    yield takeEvery(registerUser.request, registerUserSaga);
}

export default rootSaga;