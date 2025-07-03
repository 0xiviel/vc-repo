import { useGetUserInfo } from '@entities/user';
import { AuthContext } from '@shared/hooks';
import { useMemo, type PropsWithChildren } from 'react';

export const AuthContextProvider = (props: PropsWithChildren) => {
    const userInfoQuery = useGetUserInfo();

    const value = useMemo(
        () => ({
            user: userInfoQuery?.data,
            isAuthenticated: userInfoQuery.isSuccess,
        }),
        [userInfoQuery?.data]
    );

    return <AuthContext value={value}>{props.children}</AuthContext>;
};
