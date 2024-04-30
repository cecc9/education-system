import { useParams, useNavigate } from 'react-router-dom';

import BaseTemplate from '../templates/base-template';
import { useStoreItem } from '../hooks/use-store-item';
import { useRedirect } from '../hooks/use-redirect';

const StudentProfilePage = () => {
    const params = useParams<{ code: string }>();
    const navigate = useNavigate();
    const { filteredUsers, notes, courses } = useStoreItem({ role: 'student' });

    const student = filteredUsers?.find((user) => user.code === params.code);

    const studentNotes = courses.map((course) => {
        const note = notes.find(
            (note) =>
                note.courseCode === course.code &&
                note.studentCode === student?.code
        );

        return {
            nameCourse: course.name,
            note: note ? note.note : 'sin calificar',
        };
    });

    useRedirect({ entity: student, path: 'student' });

    return (
        <BaseTemplate>
            <h2 className='mb-4 text-2xl font-bold'>
                Bienvenido,{' '}
                <span className='text-blue-400'>
                    {student?.name} {student?.lastname}{' '}
                </span>
                <br />
                Codigo de Estudiante:{' '}
                <span className='text-blue-400'>{student?.code}</span>
            </h2>

            <div>
                <h3 className='mb-4 text-xl'>Tus notas son las siguientes:</h3>

                <ul>
                    {studentNotes.map((note) => (
                        <li
                            key={note.nameCourse}
                            className='flex justify-between items-center gap-4 w-96'
                        >
                            <p className='font-bold text-2xl'>
                                {note.nameCourse.toUpperCase()}
                            </p>
                            <p className='font-bold text-xl text-blue-500'>
                                {note.note}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={() => navigate(`/student/`)}
                className='mt-24 bg-red-500 px-10 py-2 rounded'
            >
                Salir
            </button>
        </BaseTemplate>
    );
};

export default StudentProfilePage;
