import { useState, useEffect } from 'react';

// Custom hook to get the window width
const useWindowWidth = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Add event listener on mount
        window.addEventListener('resize', handleResize);

        // Remove event listener on unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowWidth;
};

export default useWindowWidth;
