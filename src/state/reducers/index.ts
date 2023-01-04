import { combineReducers } from '@reduxjs/toolkit';
import { blizzardApi } from '../../services/blizzardapi';
import cardsReducer from './cardsSlice';
import authorizationReducer from './authSlice';
import rosterReducer from './rosterSlice';
import { battleNetApi } from '../../services/battlenetapi';

const rootReducer = combineReducers({
    cards: cardsReducer,
    authorization: authorizationReducer,
    roster: rosterReducer,
    [blizzardApi.reducerPath]: blizzardApi.reducer,
    [battleNetApi.reducerPath]: battleNetApi.reducer,
});

export default rootReducer;
