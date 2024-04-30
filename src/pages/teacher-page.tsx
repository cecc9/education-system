import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import BaseTemplate from '../templates/base-template';
import { useStoreItem } from '../hooks/use-store-item';

const TeacherPage = () => {
    const navigate = useNavigate();
    const { filteredUsers } = useStoreItem({ role: 'teacher' });

    const addStudentNotes = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const teacherCode = formdata.get('code') as string;

        if (!teacherCode) {
            toast.warning('Ingrese un codigo de profesor');
            return;
        }

        if (!filteredUsers.some((teacher) => teacher.code === teacherCode)) {
            toast.warning('Codigo de profesor no valido');
            return;
        }

        navigate(`/teacher/${teacherCode}`);
    };

    return (
        <BaseTemplate>
            <div className='flex flex-wrap gap-20'>
                <section className='bg-zinc-700 p-8 rounded-md'>
                    <h2 className='text-2xl font-bold mb-3'>
                        Lista de Profesores
                    </h2>
                    <p className='text-lg mb-3'>
                        puede seleccionar cualquier codigo para el ejemplo:
                    </p>
                    <ul className='flex flex-col gap-2'>
                        {filteredUsers.map((teacher) => (
                            <li
                                key={teacher.code}
                                className='flex flex-wrap gap-2'
                            >
                                <p>
                                    Nombre:{' '}
                                    <span className='text-blue-500 font-bold'>
                                        {teacher.name} {teacher.lastname}
                                    </span>
                                </p>
                                <p>
                                    Cod. Profesor:{' '}
                                    <span className='text-blue-500 font-bold'>
                                        {teacher.code}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className='flex flex-col justify-center bg-zinc-700 p-6 rounded-md'>
                    <p className='mb-4 text-base'>
                        Para agregar notas ingrese su codigo de Profesor:
                    </p>
                    <form onSubmit={addStudentNotes} className='flex'>
                        <input
                            type='text'
                            name='code'
                            placeholder='Cod. Profesor'
                            className='p-3 outline-none text-lg rounded flex-1'
                        />
                        <button
                            type='submit'
                            className='bg-blue-500 p-3 rounded'
                        >
                            Ingresar
                        </button>
                    </form>
                </section>
            </div>
        </BaseTemplate>
    );
};

export default TeacherPage;
