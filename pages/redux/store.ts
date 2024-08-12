// store.ts
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/registerSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        register: registerSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
