import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const userRoles = [
        { text: 'Estudiante', path: '/student' },
        { text: 'Profesor', path: '/teacher' },
        { text: 'Admin', path: '/admin' },
    ];

    return (
        <div className='w-full bg-transparent absolute top-0 p-3 flex justify-between'>
            <h1
                onClick={() => navigate('/')}
                className='text-xl font-bold cursor-pointer'
            >
                Sistema de educación
            </h1>
            <ul className='flex gap-4'>
                {userRoles.map((role) => (
                    <li key={role.text}>
                        <button
                            className={`${
                                pathname.includes(role.path)
                                    ? 'text-blue-500'
                                    : 'text-white'
                            } text-lg`}
                            onClick={() => navigate(role.path)}
                        >
                            {role.text}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Navbar;
