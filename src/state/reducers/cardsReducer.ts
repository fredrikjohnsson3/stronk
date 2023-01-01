import produce from 'immer';
// import { Action } from '../actions';
import { Card } from '..';

interface CardsReducerState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Card;
    };
}

const initialState: CardsReducerState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const reducer = produce(
    (
        state: CardsReducerState = initialState
        // action: Action
    ): CardsReducerState => {
        return state;
    },
    initialState
);

export default reducer;
