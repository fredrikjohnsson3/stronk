import { useGetAccessTokenQuery } from '../services/battlenetapi';
import { useAppSelector } from '../state';
import { selectTokenExpiryDate } from '../state/reducers/authSlice';

export const BnetAccessToken: React.FC<{ authCode: string }> = ({
    authCode,
}) => {
    const {
        data: res,
        isFetching,
        isLoading,
        isError,
    } = useGetAccessTokenQuery(authCode!, { skip: !authCode });

    const tokenExpiresDate = useAppSelector(selectTokenExpiryDate);

    if (isError || !res) return <div>Error! {}</div>;
    if (isLoading && !isError) return <div>Loading...</div>;

    return (
        <div>
            Token expires: {tokenExpiresDate}{' '}
            {isFetching ? '...refetching' : ''}
        </div>
    );
};
