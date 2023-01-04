import {
    selectIsLoggedIn,
    setLoggedIn,
    setAuthCode,
} from '../state/reducers/authSlice';
import { getBnetAuth } from '../services/battlenetoauth';
import { getHrefParams } from '../utilities/hrefutils';
import { useEffect } from 'react';
import { BnetAccessToken } from './bnetAccessToken';
import { useAppDispatch, useAppSelector } from '../state';

const AuthMenu: React.FC = () => {
    const params = getHrefParams();
    const authCode = params.code;

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(() => {
        if (!authCode) return;

        dispatch(setLoggedIn(true));
        dispatch(setAuthCode(authCode));
    }, [dispatch, authCode]);

    return (
        <div>
            <div>
                {!isLoggedIn && (
                    <button
                        aria-label='Log in with battle.net'
                        onClick={() => window.open(getBnetAuth(), '_self')}
                    >
                        Log in with Battle.net
                    </button>
                )}
            </div>
            <div>{isLoggedIn && <BnetAccessToken authCode={authCode} />}</div>
        </div>
    );
};

export default AuthMenu;
