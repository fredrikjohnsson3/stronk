import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setLoggedIn,
    setAccessToken,
    setTokenExpiryDate,
    selectIsLoggedIn,
    selectTokenExpiryDate,
} from '../state/reducers/authSlice';
import { getBnetAuth, getAccessToken } from '../services/battlenetoauth';
import { getHashParams } from '../services/hrefutils';

const AuthMenu: React.FC = () => {
    const params = getHashParams();
    const code = params.code;
    const access_token = params.access_token;
    const expires_in = params.access_token;

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const tokenExpiryDate = useSelector(selectTokenExpiryDate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (code) {
            getAccessToken(code);
        }
        if (access_token) {
            dispatch(setLoggedIn(true));
            dispatch(setAccessToken(access_token));
            dispatch(setTokenExpiryDate(Number(expires_in)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            AuthCode: {code}
            <div>
                {!isLoggedIn && (
                    <button
                        aria-label='Log in using OAuth 2.0'
                        onClick={() => window.open(getBnetAuth(), '_self')}
                    >
                        Log in with Battle.net
                    </button>
                )}
                {isLoggedIn && <div>Token expiry date: {tokenExpiryDate}</div>}
            </div>
        </div>
    );
};

export default AuthMenu;
