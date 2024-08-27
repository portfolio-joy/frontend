// store.ts
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { LoginUserState } from '@/types/LoginUserState';
import { UserPortfolioState } from '@/types/UserPortfolioState';
import { RegisterUserState } from '@/types/RegisterUserState';

const sagaMiddleware = createSagaMiddleware();

export interface RootState {
    login : LoginUserState,
    register : RegisterUserState,
    user : UserPortfolioState,
    aboutMe : UserPortfolioState,
    skill : UserPortfolioState,
}

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>{
        return getDefaultMiddleware().concat(sagaMiddleware)
    }
});

sagaMiddleware.run(rootSaga);

// export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;