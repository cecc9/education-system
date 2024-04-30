import { createSlice } from '@reduxjs/toolkit';

export type Course = {
    code: string;
    name: string;
    credits: number;
    teacherCode: string;
};

const initialCourses: { courses: Course[] } = {
    courses: [
        {
            code: '402',
            name: 'Matematica',
            credits: 5,
            teacherCode: '101',
        },
        {
            code: '404',
            name: 'Programacion',
            credits: 3,
            teacherCode: '102',
        },
        {
            code: '403',
            name: 'Comunicacion',
            credits: 4,
            teacherCode: '103',
        },
    ],
};

export const coursesSlice = createSlice({
    name: 'courses',
    initialState: initialCourses,
    reducers: {},
});

export default coursesSlice.reducer;
