import { useEffect, useRef, useState } from "react";

const useThrottle = (value, delay) => {
    const [throttledValue, setThrottledValue] = useState(value);

    const lastCalled = useRef(Date.now());

    useEffect(() => {
        let now = Date.now();
        let timerId;

        if (now - lastCalled.current >= delay) {
            setThrottledValue(value);
            lastCalled.current = now;
        } else {
            timerId = setTimeout(() => {
                setThrottledValue(value);
                lastCalled.current = Date.now();
            }, delay - (now - lastCalled.current));
        }
        return () => {
            if (timerId) clearTimeout(timerId)
        };
    }, [value, delay]);

    return throttledValue;
};

export default useThrottle;