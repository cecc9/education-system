import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type User = {
    code: string;
    name: string;
    lastname: string;
    role: string;
};

const initialState: { users: User[]; filteredUsers: User[] } = {
    users: [
        { code: '101', name: 'Marcos', lastname: 'Romero', role: 'teacher' },
        { code: '102', name: 'Eduard', lastname: 'Choque', role: 'teacher' },
        { code: '103', name: 'Carlos', lastname: 'Rondon', role: 'teacher' },
        { code: '001', name: 'Jose', lastname: 'Martinez', role: 'student' },
        { code: '002', name: 'Maria', lastname: 'Sanchez', role: 'student' },
        { code: '003', name: 'Luis', lastname: 'Rodriguez', role: 'student' },
        { code: '999', name: 'Elias', lastname: 'Torres', role: 'admin' },
    ],
    filteredUsers: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        filterUsersByRole: (state, action: PayloadAction<User['role']>) => {
            state.filteredUsers = state.users.filter(
                (user) => user.role === action.payload
            );
        },
    },
});

export const { filterUsersByRole } = usersSlice.actions;
export default usersSlice.reducer;
