import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-hot-toast'

const localTotalItems = localStorage.getItem('totalItems')  // fetching totalItems from localStorage
const localCart = localStorage.getItem('cart')  // fetching Itmes in Cart from LS
const localTotal = localStorage.getItem('total')    // fetching total Price from LS

const initialState = {
    totalItems: localTotalItems ? JSON.parse(localTotalItems) : 0,
    cart: localCart ? JSON.parse(localCart) : [],
    total: localTotal ? JSON.parse(localTotal) : 0,
}

const cartSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        setTotalItem(state, value) {
            state.token = value.payload;
        },
        // TODO: COMPLETE THEM
        //add to cart
        addToCart: (state, action) => { },

        //remove from cart
        removeFromCart: (state, action) => { },

        //reset cart
        resetCart: (state) => { }
    }
})

export const { } = cartSlice.actions;
export default cartSlice.reducer;