import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-hot-toast'

const localTotalItems = localStorage.getItem('totalItems')
const initialState = {
    totalItems: localTotalItems ? JSON.parse(localTotalItems) : [],

}

const cartSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setTotalItem(state, value) {
            state.token = value.payload;
        }
        //add to cart
        //remove from cart
        //reset cart
    }
})

export const { } = cartSlice.actions;
export default cartSlice.reducer;