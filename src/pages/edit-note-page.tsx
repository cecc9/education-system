import { useLocation, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { User } from '../features/users/users-slice';
import BaseTemplate from '../templates/base-template';
import { updateNote, addNote } from '../features/notes/notes-slice';

const EditNotePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const student = location.state as User;

    const {
        courses: { courses },
        notes,
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const studentNotes = courses.map((course) => {
        const note = notes.find(
            (note) =>
                note.courseCode === course.code &&
                note.studentCode === student?.code
        );

        return {
            nameCourse: course.name,
            codeCourse: course.code,
            note: note ? note.note : 'sin calificar',
        };
    });

    const editNoteStudent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const note = formdata.get('note') as string;
        const code = formdata.get('code') as string;

        if (note === '') {
            toast.warning('debes ingresar una nota');
            return;
        }

        if (Number(note) < 0 || Number(note) > 20) {
            toast.warning('Ingrese una nota valida entre 0 y 20');
            return;
        }

        dispatch(
            updateNote({
                note: Number(note),
                studentCode: student.code,
                courseCode: code,
            })
        );
        toast.success(
            `actualizaste la nota de ${student.name} ${student.lastname}`
        );
    };

    const addNoteStudent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const note = formdata.get('note') as string;
        const code = formdata.get('code') as string;

        if (note === '') {
            toast.warning('debes ingresar una nota');
            return;
        }

        if (Number(note) < 0 || Number(note) > 20) {
            toast.warning('Ingrese una nota valida entre 0 y 20');
            return;
        }

        dispatch(
            addNote({
                note: Number(note),
                studentCode: student.code,
                courseCode: code,
            })
        );
        toast.success(
            `agregaste una nueva nota para ${student.name} ${student.lastname}`
        );
    };

    return (
        <BaseTemplate>
            <h2 className='mb-2'>
                Editar las notas de:{' '}
                <span className='text-blue-500 font-semibold'>
                    {student.name} {student.lastname} - {student.code}
                </span>
            </h2>
            <ul className='flex flex-col gap-5 w-[570px]'>
                {studentNotes.map((note) => (
                    <li
                        key={note.nameCourse}
                        className='flex gap-4 justify-between items-center'
                    >
                        <p className='font-bold text-xl'>
                            {note.nameCourse.toUpperCase()} ({note.note})
                        </p>
                        <form
                            onSubmit={
                                note.note === 'sin calificar'
                                    ? addNoteStudent
                                    : editNoteStudent
                            }
                            className='flex gap-4'
                        >
                            <input
                                type='number'
                                name='note'
                                defaultValue={note.note}
                                className='w-32 p-3 outline-none text-lg rounded'
                                autoFocus
                            />
                            <input
                                type='text'
                                name='code'
                                defaultValue={note.codeCourse}
                                className='hidden'
                            />

                            <button
                                type='submit'
                                className='bg-blue-500 p-3 rounded'
                            >
                                {note.note === 'sin calificar'
                                    ? 'Agregar nota'
                                    : 'Editar nota'}
                            </button>
                        </form>
                    </li>
                ))}
            </ul>

            <button
                onClick={() => navigate(`/admin/999`)}
                className='mt-24 bg-blue-500 px-10 py-2 rounded'
            >
                Regresar
            </button>
        </BaseTemplate>
    );
};

export default EditNotePage;
