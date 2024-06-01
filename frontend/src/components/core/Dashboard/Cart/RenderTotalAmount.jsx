import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

function RenderTotalAmount() {
    const totalAmount = useSelector(state => state.cart.total);
    const { cart } = useSelector(state => state.cart);

    // function to initiate transactions
    function handleBuyCourse() {
        const courses = cart.map(course => course._id);
        console.log("Courses in cart: ", courses);
        //TODO: add payment gateway
    }

    return (
        <div className="lg:max-w-[280px] w-full rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">
                Total:
            </p>

            <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {totalAmount.toLocaleString()}
            </p>

            <IconBtn
                text="Buy Now"
                onClick={handleBuyCourse}
                customClasses="w-full justify-center"
            />

        </div>
    )
}

export default RenderTotalAmount