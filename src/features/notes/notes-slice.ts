import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Note = {
    studentCode: string;
    courseCode: string;
    note: number;
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState: [] as Note[],
    reducers: {
        addNote: (state, action: PayloadAction<Note>) => {
            state.push(action.payload);
        },

        updateNote: (state, action: PayloadAction<Note>) => {
            const { studentCode, courseCode, note } = action.payload;
            const noteToUpdate = state.find(
                (note) =>
                    note.studentCode === studentCode &&
                    note.courseCode === courseCode
            );
            if (noteToUpdate) {
                noteToUpdate.note = note;
            }
        },
    },
});

export default notesSlice.reducer;
export const { addNote, updateNote } = notesSlice.actions;
