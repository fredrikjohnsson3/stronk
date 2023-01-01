import { blizzardApi } from '../services/blizzardapi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) => gDM().concat(blizzardApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export default store;
