import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types';
import { fetchPizzas } from './asyncActions';

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING,

}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    },
})

// Action creators are generated for each case reducer function
export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer