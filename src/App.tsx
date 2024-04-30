import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import StudentPage from './pages/student-page';
import TeacherPage from './pages/teacher-page';
import AdminPage from './pages/admin-page';
import StudentProfilePage from './pages/student-profile-page';
import TeacherProfilePage from './pages/teacher-profile-page';
import AddNotePage from './pages/add-note-page';
import EditNotePage from './pages/edit-note-page';
import AdminProfilePage from './pages/admin-profile-page';

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/student' element={<StudentPage />} />
            <Route path='/student/:code' element={<StudentProfilePage />} />
            <Route path='/teacher' element={<TeacherPage />} />
            <Route path='/teacher/:code' element={<TeacherProfilePage />} />
            <Route path='/teacher/add-note' element={<AddNotePage />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/:code' element={<AdminProfilePage />} />
            <Route path='/admin/edit-note' element={<EditNotePage />} />
        </Routes>
    );
}

export default App;
