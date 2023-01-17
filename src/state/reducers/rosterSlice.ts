import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Roster } from '..';
import { RootState } from '../store';

interface RosterSliceState {
    order: string[];
    updatedAt: number | null;
    data: {
        [key: string]: Character;
    };
}

const initialState: RosterSliceState = {
    order: [],
    updatedAt: null,
    data: {},
};

export const rosterSlice = createSlice({
    name: 'roster',
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<Roster>) => {
            // check if character already exists in roster first and return a message
            if (state.order.indexOf(action.payload._id) > -1) return;
            const id = action.payload._id;
            state.order.push(id);
            state.data[id] = action.payload;
        },
        updateCharacter: (state, action: PayloadAction<Roster>) => {
            const id = action.payload._id;
            state.data[id] = action.payload;
            const date = new Date();
            state.updatedAt = date.setSeconds(date.getSeconds());
        },
        deleteCharacter: (state, action: PayloadAction<Roster>) => {
            const id = action.payload._id;
            const orderIndex = state.order.indexOf(id);
            delete state.data[id];
            state.order.splice(orderIndex, 1);
        },
        setRoleSpec: (state, action: PayloadAction<Roster>) => {
            const id = action.payload._id;
            state.data[id]._role = action.payload._role;
            state.data[id]._mainSpec = action.payload._mainSpec;
        },
        setSetBonusEmbellished: (state, action: PayloadAction<Roster>) => {
            const id = action.payload._id;
            state.data[id]._setBonus = action.payload._setBonus;
            state.data[id]._embellished = action.payload._embellished;
        },
    },
});

export const {
    addCharacter,
    updateCharacter,
    deleteCharacter,
    setRoleSpec,
    setSetBonusEmbellished,
} = rosterSlice.actions;

export const selectRosterOrder = (state: RootState) => state.roster.order;
export const selectRosterData = (state: RootState) => state.roster.data;
export const selectRosterUpdatedAt = (state: RootState) =>
    state.roster.updatedAt;

export default rosterSlice.reducer;
