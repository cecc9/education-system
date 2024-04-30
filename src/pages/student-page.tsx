import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import BaseTemplate from '../templates/base-template';
import { useStoreItem } from '../hooks/use-store-item';

const StudentPage = () => {
    const navigate = useNavigate();
    const { filteredUsers } = useStoreItem({ role: 'student' });

    const viewStudentNotes = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const studentCode = formdata.get('code') as string;

        if (!studentCode) {
            toast.warning('Ingrese un codigo de estudiante');
            return;
        }

        if (!filteredUsers.some((student) => student.code === studentCode)) {
            toast.warning('Codigo de estudiante no valido');
            return;
        }

        navigate(`/student/${studentCode}`);
    };

    return (
        <BaseTemplate>
            <div className='flex flex-wrap gap-20'>
                <section className='bg-zinc-700 p-8 rounded-md'>
                    <h2 className='text-2xl font-bold mb-3'>
                        Lista de Estudiantes
                    </h2>
                    <p className='text-lg mb-3'>
                        Seleccione un codigo de un estudiante para el ejemplo:
                    </p>
                    <ul className='flex flex-col gap-2'>
                        {filteredUsers.map((student) => (
                            <li
                                key={student.code}
                                className='flex flex-wrap gap-2'
                            >
                                <p>
                                    Nombre:{' '}
                                    <span className='text-blue-500 font-bold'>
                                        {student.name} {student.lastname}
                                    </span>
                                </p>
                                <p>
                                    Cod. Estudiante:{' '}
                                    <span className='text-blue-500 font-bold'>
                                        {student.code}
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
                <section className='flex flex-col justify-center bg-zinc-700 p-6 rounded-md'>
                    <p className='mb-4 text-base'>
                        Para ver sus notas ingrese su codigo de estudiante:
                    </p>

                    <form onSubmit={viewStudentNotes} className='flex'>
                        <input
                            type='text'
                            name='code'
                            placeholder='Cod. Estudiante'
                            className='p-3 outline-none text-lg rounded flex-1'
                        />
                        <button className='bg-blue-500 p-3 rounded'>
                            Ingresar
                        </button>
                    </form>
                </section>
            </div>
        </BaseTemplate>
    );
};

export default StudentPage;
