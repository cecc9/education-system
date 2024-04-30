import { useNavigate, useParams } from 'react-router-dom';

import BaseTemplate from '../templates/base-template';
import { useStoreItem } from '../hooks/use-store-item';
import { useRedirect } from '../hooks/use-redirect';

const AdminProfilePage = () => {
    const navigate = useNavigate();
    const params = useParams<{ code: string }>();
    const { filteredUsers, users } = useStoreItem({ role: 'student' });

    const adminInfo = users.find((user) => user.code === params.code);

    useRedirect({ entity: adminInfo, path: 'admin' });

    return (
        <BaseTemplate>
            <h2 className='text-2xl mb-5 font-bold'>Lista de Estudiantes</h2>
            <ul className='flex flex-col gap-5 w-96'>
                {filteredUsers.map((student) => (
                    <li
                        key={student.code}
                        className='flex gap-5 items-center justify-between'
                    >
                        <p className='text-lg'>
                            {student.name} {student.lastname} - {student.code}
                        </p>
                        <button
                            onClick={() =>
                                navigate('/admin/edit-note', { state: student })
                            }
                            className='px-10 py-4 bg-blue-500 rounded'
                        >
                            Editar Nota
                        </button>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => navigate(`/admin/`)}
                className='mt-24 bg-red-500 px-10 py-2 rounded'
            >
                Salir
            </button>
        </BaseTemplate>
    );
};

export default AdminProfilePage;
