import { blizzardApi } from '../services/blizzardapi';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import rootReducer from './reducers';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { battleNetApi } from '../services/battlenetapi';

const store = configureStore({
    reducer: rootReducer,
    middleware: (gDM) =>
        gDM().concat([blizzardApi.middleware, battleNetApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
