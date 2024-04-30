import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../features/users/users-slice';

interface Props {
    entity: User | undefined;
    path: string;
}

export const useRedirect = ({ entity, path }: Props) => {
    const navigate = useNavigate();

    useEffect(() => {
        // si ingresa manualmente la url /teacher/020202
        if (!entity) {
            navigate(`/${path}`);
        }
    }, [entity, navigate, path]);
};
