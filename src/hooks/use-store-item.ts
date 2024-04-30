import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { filterUsersByRole } from '../features/users/users-slice';

interface Props {
    role: string;
}

export const useStoreItem = ({ role }: Props) => {
    const {
        users: { filteredUsers, users },
        courses: { courses },
        notes,
    } = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(filterUsersByRole(role));
    }, [dispatch, role]);

    return { filteredUsers, users, courses, notes };
};
