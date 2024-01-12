import { configureStore } from '@reduxjs/toolkit';
import Reactotron from '../../ReactotronConfig';
import counterSlice from '../screens/counter/counterSlice';
import appSlice from './appSlice';

const store = configureStore({
    reducer: {
        app: appSlice,
        counter: counterSlice,
    },
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat((Reactotron as any).createEnhancer()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
