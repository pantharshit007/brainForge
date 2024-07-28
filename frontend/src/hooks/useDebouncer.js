import { useEffect, useState } from 'react'

function useDebouncer(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // setting the delay: 500ms (0.5s)
        const handle = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // clearing the time out
        return () => {
            clearTimeout(handle);
        }
    }, [value, delay]);

    return debouncedValue;

}

export default useDebouncer