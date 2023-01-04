import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card, CardTypes } from '..';
import { RootState } from '../store';

const randomId = () => {
    return Math.random().toString(36).substring(2, 5);
};

interface CardSliceState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Card;
    };
}

const initialState: CardSliceState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

export const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        // add a new card
        addCard: (
            state,
            action: PayloadAction<{ type: CardTypes; id: string }>
        ) => {
            // Creates a new empty card with a new Id of the specified type
            const card: Card = {
                id: randomId(),
                content: '',
                type: action.payload.type,
            };

            state.data[card.id] = card;
            state.order.unshift(card.id);

            // use something like below if we'd like to add cards anywhere in the order

            // const foundIndex = state.order.findIndex(
            //     (id) => id === action.payload.id
            // );

            // if (foundIndex < 0) {
            //     state.order.unshift(card.id);
            // } else {
            //     state.order.splice(foundIndex + 1, 0, card.id);
            // }
        },

        // handle cards being dragged in to a new position
        moveCard: (
            state,
            action: PayloadAction<{ replaceId: string; id: string }>
        ) => {
            // finds the index of the card to replace
            const replaceIndex = state.order.findIndex((id) => {
                return id === action.payload.replaceId;
            });

            // sets the index of the new card to be before the replaced card
            const targetIndex = replaceIndex - 1;

            // finds the old index of the card being dragged
            const oldIndex = state.order.findIndex((id) => {
                return id === action.payload.id;
            });

            //checks to see if target is outside the array
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }

            // moves the dragged card to a position before the replaced card
            state.order.splice(
                targetIndex,
                0,
                state.order.splice(oldIndex, 1)[0]
            );
        },
    },
});

export const { setLoading, setError, addCard, moveCard } = cardsSlice.actions;

export const selectCardIsLoading = (state: RootState) => state.cards.loading;
export const selectCardError = (state: RootState) => state.cards.error;
export const selectCardOrder = (state: RootState) => state.cards.order;
export const selectCardData = (state: RootState) => state.cards.data;

export default cardsSlice.reducer;
