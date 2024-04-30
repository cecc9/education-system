import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import BaseTemplate from '../templates/base-template';

import { useStoreItem } from '../hooks/use-store-item';

const AdminPage = () => {
    const navigate = useNavigate();
    const { filteredUsers } = useStoreItem({ role: 'admin' });

    const editStudentNotes = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const adminCode = formdata.get('code') as string;

        if (!adminCode) {
            toast.warning('Ingrese el codigo de administrador');
            return;
        }

        if (!filteredUsers.some((admin) => admin.code === adminCode)) {
            toast.warning('Codigo de administrador no valido');
            return;
        }

        navigate(`/admin/${adminCode}`);
    };

    return (
        <BaseTemplate>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-bold'>Administrador</h2>
                <p className='p-3'>
                    Codigo de Administrador, ejemplo:{' '}
                    <span className='text-blue-500 font-bold text-xl'>999</span>
                </p>
                <p className='mb-2'>Ingrese su codigo de administrador: </p>
                <form onSubmit={editStudentNotes} className='flex'>
                    <input
                        type='text'
                        name='code'
                        className='p-4 rounded outline-none text-lg'
                        placeholder='Cod. admin'
                    />
                    <button
                        type='submit'
                        className='px-10 py-4 bg-blue-500 rounded'
                    >
                        Ingresar
                    </button>
                </form>
            </div>
        </BaseTemplate>
    );
};

export default AdminPage;
