import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/backendCallFunction/paymentAPI';
import { useNavigate } from 'react-router-dom';

function RenderTotalAmount() {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cart } = useSelector(state => state.cart);
    const totalAmount = useSelector(state => state.cart.total);
    const { paymentLoading } = useSelector((state) => state.course);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    // function to initiate transactions
    async function handleBuyCourse() {
        const allCourseId = cart.map(course => course._id);
        await buyCourse(token, allCourseId, user, navigate, dispatch, paymentLoading)
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