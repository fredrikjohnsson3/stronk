import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../character';
import { RootState } from '../store';

interface RosterSliceState {
    id: string;
    order: string[];
    updatedAt: number | null;
    data: {
        [key: string]: Character;
    };
}

const initialState: RosterSliceState = {
    id: '',
    order: [],
    updatedAt: null,
    data: {},
};

export const rosterSlice = createSlice({
    name: 'roster',
    initialState,
    reducers: {
        addCharacter: (state, action: PayloadAction<Character>) => {},
        updateCharacter: (state, action: PayloadAction<Character>) => {},
    },
});

export const { addCharacter, updateCharacter } = rosterSlice.actions;

export const selectRosterOrder = (state: RootState) => state.roster.order;
export const selectRosterData = (state: RootState) => state.roster.data;
export const selectRosterUpdatedAt = (state: RootState) =>
    state.roster.updatedAt;

export default rosterSlice.reducer;
