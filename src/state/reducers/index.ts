import { combineReducers } from '@reduxjs/toolkit';
import { blizzardApi } from '../../services/blizzardapi';
import cardsReducer from './cardsReducer';
import authorizationReducer from './authSlice';

const rootReducer = combineReducers({
    submits: cardsReducer,
    authorization: authorizationReducer,
    [blizzardApi.reducerPath]: blizzardApi.reducer,
});

export default rootReducer;
