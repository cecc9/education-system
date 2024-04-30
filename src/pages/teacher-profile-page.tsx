import { useNavigate, useParams } from 'react-router-dom';

import BaseTemplate from '../templates/base-template';
import { useStoreItem } from '../hooks/use-store-item';
import { useRedirect } from '../hooks/use-redirect';

const TeacherProfilePage = () => {
    const params = useParams<{ code: string }>();
    const navigate = useNavigate();
    const { filteredUsers, users, courses } = useStoreItem({ role: 'student' });

    const teacherInfo = users.find((user) => user.code === params.code);

    useRedirect({ entity: teacherInfo, path: 'teacher' });

    return (
        <BaseTemplate>
            <h2 className='text-2xl mb-4'>
                Bienvenido, Prof.{' '}
                <span className='text-blue-500 font-bold'>
                    {teacherInfo?.name} {teacherInfo?.lastname},{' '}
                </span>
                Curso de:{' '}
                <span className='text-blue-500 font-bold'>
                    {
                        courses.find(
                            (course) => course.teacherCode === teacherInfo?.code
                        )?.name
                    }
                </span>
            </h2>
            <div className='flex flex-col gap-4'>
                <h3 className='text-xl'>Lista de estudiantes: </h3>

                <ul className='flex flex-col gap-4'>
                    {filteredUsers.map((student) => (
                        <li
                            key={student.code}
                            className='w-72 flex gap-2 items-center justify-between'
                        >
                            <p>
                                {student.name} {student.lastname} -{' '}
                                {student.code}
                            </p>
                            <button
                                onClick={() =>
                                    navigate('/teacher/add-note', {
                                        state: {
                                            teacherInfo,
                                            studentInfo: student,
                                            courseInfo: courses.find(
                                                (course) =>
                                                    course.teacherCode ===
                                                    teacherInfo?.code
                                            ),
                                        },
                                    })
                                }
                                className='bg-blue-500 p-3 rounded'
                            >
                                calificar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={() => navigate(`/teacher/`)}
                className='mt-24 bg-red-500 px-10 py-2 rounded'
            >
                Salir
            </button>
        </BaseTemplate>
    );
};

export default TeacherProfilePage;
