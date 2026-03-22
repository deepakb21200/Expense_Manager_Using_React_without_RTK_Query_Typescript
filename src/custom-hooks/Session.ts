import { useEffect, useState } from 'react';
import type { Mode } from '../hooks/contextapi/Theme';


const useLocalStorage = (key: string, initialValue: boolean | Mode) => {
    const [value, setValue] = useState(() => {
        try {
            console.log("inside  ");
            
            const localValue = window.localStorage.getItem(key);
            return localValue ? JSON.parse(localValue) : initialValue;
        } catch (error) { 
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;

