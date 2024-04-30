import { useLocation, useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { toast } from 'sonner';

import BaseTemplate from '../templates/base-template';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addNote } from '../features/notes/notes-slice';

import { type User } from '../features/users/users-slice';
import { type Course } from '../features/courses/courses-slice';

type TypeState = {
    teacherInfo: User;
    studentInfo: User;
    courseInfo: Course;
};

const AddNotePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { studentInfo, courseInfo, teacherInfo } =
        location.state as TypeState;

    const dispatch = useAppDispatch();
    const notes = useAppSelector((state) => state.notes);

    const addedNote = notes.find(
        (note) =>
            note.studentCode === studentInfo.code &&
            note.courseCode === courseInfo.code
    );

    const addNoteToStudent = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);
        const note = formdata.get('note') as string;

        if (!note) {
            toast.warning('Ingrese una nota');
            return;
        }

        if (Number(note) < 0 || Number(note) > 20) {
            toast.warning('Ingrese una nota valida entre 0 y 20');
            return;
        }

        if (
            notes.some(
                (note) =>
                    note.studentCode === studentInfo.code &&
                    note.courseCode === courseInfo.code
            )
        ) {
            toast.warning(
                'ya existe una nota para este estudiante en este curso'
            );
            return;
        }

        dispatch(
            addNote({
                studentCode: studentInfo.code,
                courseCode: courseInfo.code,
                note: Number(note),
            })
        );
    };

    return (
        <BaseTemplate>
            <div>
                <div className='mb-3'>
                    <h3 className='text-2xl font-bold mb-2'>
                        Agregar nota para estudiante:{' '}
                    </h3>
                    <p>
                        Nombre:{' '}
                        <span className='text-blue-400 text-lg font-semibold'>
                            {studentInfo.name} {studentInfo.lastname}
                        </span>
                    </p>
                    <p>
                        Codigo de estudiante:{' '}
                        <span className='text-blue-400 text-lg font-semibold'>
                            {studentInfo.code}
                        </span>
                    </p>
                    <p>
                        Curso:{' '}
                        <span className='text-blue-400 text-lg font-semibold'>
                            {courseInfo.name}
                        </span>
                    </p>
                    {addedNote && (
                        <p>
                            Nota final:{' '}
                            <span className='text-blue-400 text-lg font-semibold'>
                                {addedNote.note}
                            </span>
                        </p>
                    )}
                </div>

                <form onSubmit={addNoteToStudent}>
                    <input
                        type='number'
                        name='note'
                        placeholder='ingrese calificacion'
                        className='p-4 rounded outline-none text-lg'
                    />
                    <button
                        disabled={Boolean(addedNote)}
                        className='px-10 py-4 bg-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Calificar
                    </button>
                </form>

                {addedNote && (
                    <p className='text-red-400 text-sm mt-4'>
                        Ya se ha agregado una nota para este estudiante, si
                        deseas modificar comunicate con el admin
                    </p>
                )}
            </div>

            <button
                onClick={() => navigate(`/teacher/${teacherInfo.code}`)}
                className='mt-24 bg-violet-600 px-10 py-2 rounded'
            >
                Regresar
            </button>
        </BaseTemplate>
    );
};

export default AddNotePage;
