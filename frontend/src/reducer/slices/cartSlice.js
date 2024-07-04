import { createSlice } from "@reduxjs/toolkit"
import { toast } from 'react-hot-toast'
import { errorToastPosition, toastPosition } from "../../utils/constant"

const localTotalItems = localStorage.getItem('totalItems')  // fetching totalItems from localStorage
const localCart = localStorage.getItem('cart')  // fetching Itmes in Cart from LS
const localTotal = localStorage.getItem('total')    // fetching total Price from LS

const initialState = {
    totalItems: localTotalItems ? JSON.parse(localTotalItems) : 0,
    cart: localCart ? JSON.parse(localCart) : [],
    total: localTotal ? JSON.parse(localTotal) : 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        //add to cart
        addToCart: (state, action) => {
            const course = action.payload;
            const isAlreadyInCart = state.cart.findIndex(item => item._id === course._id);

            // check if already in cart
            if (isAlreadyInCart >= 0) {
                toast.error("Course already in cart", errorToastPosition);
                return
            }

            // add course to cart: arr[]
            state.cart.push(course);
            // update total Item and price
            state.totalItems++;
            state.total += course.price;

            // update new values in Local storage
            localStorage.setItem('cart', JSON.stringify(state.cart));
            localStorage.setItem('totalItems', JSON.stringify(state.totalItems));
            localStorage.setItem('total', JSON.stringify(state.total));

            toast.success('Course added to cart', toastPosition);

        },

        //remove from cart
        removeFromCart: (state, action) => {
            const courseId = action.payload;
            const courseIndex = state.cart.findIndex(item => item._id === courseId);

            // check if course is available
            if (courseIndex >= 0) {
                // update cart, total Items and total Price
                state.total -= state.cart[courseIndex].price;
                state.totalItems--;
                state.cart.splice(courseIndex, 1);  //courseIndex: position in array: 0,1,2,3,..

                // update Local Storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
                localStorage.setItem("total", JSON.stringify(state.total));

                toast.success("Course Removed from cart", toastPosition);
            }
        },

        //reset cart
        resetCart: (state) => {
            // update all cart, total Items, total Price data to inital State
            state.cart = [];
            state.totalItems = 0;
            state.total = 0;

            // update Local storage data
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('totalItems');

        }
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;