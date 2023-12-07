import React, {useEffect, useState} from 'react';

const Error = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate an error and set it to fade away after 2 seconds
        const errorMessage = 'This is an error from Component E';
        setError(errorMessage);

        const timeoutId = setTimeout(() => {
            setError(null);
        }, 2000);

        // Cleanup the timeout to avoid memory leaks
        return () => clearTimeout(timeoutId);
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div>
            {/* Pass the error to Component A */}
            {/*<ComponentA error={error} />*/}
        </div>
    );
};

export default ComponentE;