import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/navbar';

interface Props {
    children: ReactNode;
}

const BaseTemplate = ({ children }: Props) => {
    const location = useLocation();

    return (
        <div className='h-screen flex flex-col justify-center items-center p-2'>
            {location.pathname !== '/' && <Navbar />}
            {children}
        </div>
    );
};

export default BaseTemplate;
