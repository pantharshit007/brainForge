import { toast } from 'react-hot-toast';
import { errorToastPosition, toastPosition } from '../../utils/constant';
import { apiConnector } from '../apiConnector';
import rzplogo from "../../assets/Logo/rzp_logo1.jpeg";
import { setPaymentLoading } from '../../reducer/slices/courseSlice';
import { resetCart } from '../../reducer/slices/cartSlice';
import { paymentEndpoint } from '../apis';

const { COURSE_PAYMENT_API, VERIFY_PAYMENT_API, PAYMENT_SUCCESS_EMAIL_API } = paymentEndpoint;

// Function to load Razorpay script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => reject(new Error('Razorpay SDK failed to load.'));
        document.body.appendChild(script);
    });
}

// Function to handle course purchase
export async function buyCourse(token, courses, userDetails, navigate, dispatch, paymentLoading) {
    const toastId = toast.loading("Please wait while we redirect you to the payment Gateway");
    const headers = { Authorization: 'Bearer ' + token };

    try {
        // Load Razorpay script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?", errorToastPosition);
            return;
        }

        // Call backend API to initiate payment
        const response = await apiConnector('POST', COURSE_PAYMENT_API, { courses }, headers);

        // Check for errors from the backend
        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        // Create Razorpay options
        const amount = response?.data?.amount;
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            currency: response?.data.currency,
            amount: amount.toString(),
            order_id: response?.data.orderId,
            name: "Brain Forge",
            description: "Thank you for purchasing the course",
            image: rzplogo,
            prefill: {
                name: `${userDetails?.firstName} ${userDetails?.lastName}`,
                email: userDetails?.email,
            },
            handler: async function (response) {
                // console.log("Course Buy:", response);
                // Verify payment
                await verifyPayment(response, courses, token, navigate, dispatch, paymentLoading, amount);
                // Send success email
                await sendPaymentSuccessEmail(response, amount, token,);
            },
            theme: { color: "#4f46e5" }
        };

        // Open Razorpay payment modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on('payment.failed', function (response) {
            toast.error(`Payment Failed: ${response?.error?.description}`, errorToastPosition);
            console.error('Payment Failed:', response?.error?.description);
        });

        return response.data

    } catch (err) {
        toast.error(`Payment Failed: ${err.message}`, errorToastPosition);
        console.error('> PAYMENT FAILED API ERROR: ', err);

    } finally {
        toast.dismiss(toastId);
    }
}

// Function to verify payment
async function verifyPayment(response, courses, token, navigate, dispatch, paymentLoading, amount) {
    const toastId = toast.loading('Wait while we verify...');
    const headers = { Authorization: 'Bearer ' + token };
    const data = {
        razorpay_payment_id: response?.razorpay_payment_id,
        razorpay_order_id: response?.razorpay_order_id,
        razorpay_signature: response?.razorpay_signature,
        courses: courses.courses || courses,
        amount
    };

    if (paymentLoading) {
        toast.error('Wait for previous payment to complete', errorToastPosition);
        return;
    }
    dispatch(setPaymentLoading(true));

    try {
        // Call backend API to verify payment
        const response = await apiConnector('POST', VERIFY_PAYMENT_API, data, headers);
        // console.log("Verify Response: ", response);

        if (!response?.data?.success) {
            throw new Error(response?.data?.message);
        }

        toast.success('Payment Success, Course Purchased!', toastPosition);
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());

    } catch (err) {
        console.error('> FAILED TO VERIFY COURSE PURCHASE:', err);
        toast.error(`Failed to verify Purchase: ${err.message}`, errorToastPosition);

    } finally {
        toast.dismiss(toastId);
        dispatch(setPaymentLoading(false));
    }
}

// Function to send payment success email
async function sendPaymentSuccessEmail(response, amount, token) {
    const headers = { Authorization: 'Bearer ' + token };
    const data = {
        amount,
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
    };

    try {
        // Call backend API to send payment success email
        const response = await apiConnector('POST', PAYMENT_SUCCESS_EMAIL_API, data, headers);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

    } catch (err) {
        console.error('> PAYMENT SUCCESS MAIL API ERROR: ', err);
        toast.error(`Payment Mail Error: ${err.message}`, errorToastPosition);
    }
}
