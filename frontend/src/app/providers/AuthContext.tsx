import { useGetUserInfo } from '@entities/user';
import { AuthContext } from '@shared/hooks';
import { FullScreenLoader } from '@shared/ui/fullscreen-loader';
import { useMemo, type PropsWithChildren } from 'react';

export const AuthContextProvider = (props: PropsWithChildren) => {
    const userInfoQuery = useGetUserInfo();

    const value = useMemo(
        () => ({
            user: userInfoQuery?.data,
            isAuthenticated: userInfoQuery.isSuccess,
            refetch: userInfoQuery?.refetch,
        }),
        [userInfoQuery?.data]
    );

    if (userInfoQuery?.isLoading) {
        return <FullScreenLoader />;
    }

    return <AuthContext value={value}>{props.children}</AuthContext>;
};
