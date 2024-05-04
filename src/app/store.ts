import { configureStore, Middleware } from '@reduxjs/toolkit';

// import studentsReducer from '../features/students/students-slice';
// import teachersReducer from '../features/teachers/teachers-slice';
import usersReducer from '../features/users/users-slice';
import coursesReducer from '../features/courses/courses-slice';
import notesReducer from '../features/notes/notes-slice';

const notesPersistenceMiddleware: Middleware =
    ({ getState }) =>
    (next) =>
    (action) => {
        next(action);
        const { notes } = getState() as RootState;
        localStorage.setItem('notes', JSON.stringify(notes));
    };

export const store = configureStore({
    reducer: {
        users: usersReducer,
        courses: coursesReducer,
        notes: notesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(notesPersistenceMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
