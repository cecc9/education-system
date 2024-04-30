import { configureStore } from '@reduxjs/toolkit';

// import studentsReducer from '../features/students/students-slice';
// import teachersReducer from '../features/teachers/teachers-slice';
import usersReducer from '../features/users/users-slice';
import coursesReducer from '../features/courses/courses-slice';
import notesReducer from '../features/notes/notes-slice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        courses: coursesReducer,
        notes: notesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
