import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../screens/counter/counterSlice';
import appSlice from './appSlice';

const store = configureStore({
    reducer: {
        app: appSlice,
        counter: counterSlice,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
