import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className=' flex items-center justify-center max-h-screen'>
            <HashLoader />;
        </div >
    )
}

export default Loading;
