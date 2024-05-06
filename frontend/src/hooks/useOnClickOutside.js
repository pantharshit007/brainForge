import { useEffect } from "react";

// This hook detects clicks outside of the specified component and calls the provided handler function.
export default function useOnClickOutside(ref, handler) {

    useEffect(() => {
        const eventHandler = (e) => {
            const element = ref.current;

            // If the click/touch event is originated outside of ref element or container(div)
            if (element && !element.contains(e.target)) {
                //set the status to false/e
                handler(e);
            } else {
                return
            }
        }
        // Add event listeners for mousedown and touchstart events on the document
        document.addEventListener('pointerdown', eventHandler);
        document.addEventListener('touchstart', eventHandler);

        // Cleanup function to remove the event listeners when the component unmounts or when the ref/handler dependencies change
        return () => {
            document.removeEventListener('pointerdown', eventHandler);
            document.removeEventListener('touchstart', eventHandler);
        }
    }, [ref, handler])   // Only run this effect when the ref or handler function changes
}