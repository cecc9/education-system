import { useNavigate } from 'react-router-dom';
import BaseTemplate from '../templates/base-template';

const HomePage = () => {
    const navigate = useNavigate();

    const userRoles = [
        { text: 'Estudiante', path: '/student' },
        { text: 'Profesor', path: '/teacher' },
        { text: 'Admin', path: '/admin' },
    ];

    return (
        <BaseTemplate>
            <h2 className='mb-4 text-3xl font-bold'>Sistema de Educacion</h2>
            <p className='mb-4 text-xl font-bold'>Ingrese como: </p>
            <div className='flex flex-col gap-4'>
                {userRoles.map((btn) => (
                    <button
                        key={btn.text}
                        onClick={() => navigate(btn.path)}
                        className='py-4 px-10 bg-indigo-500 rounded text-lg'
                    >
                        {btn.text}
                    </button>
                ))}
            </div>
        </BaseTemplate>
    );
};

export default HomePage;
