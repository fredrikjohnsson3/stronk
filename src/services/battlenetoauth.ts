const API_URL = 'https://oauth.battle.net/authorize';
const CLIENT_ID =
    process.env.STRONK_APP_CLIENT_ID || 'e4557bc3c57f46be852b3dec45563982';
const CLIENT_SECRET = process.env.STRONK_APP_CLIENT_SECRET;
const REDIR_URI = 'http://localhost:3000';

const b64credentials = window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
const scopes = ['wow.profile'];

export const getBnetAuth = (): string => {
    return `${API_URL}?client_id=${CLIENT_ID}&scope=${scopes.join(
        '%20'
    )}&state=codestate&redirect_uri=${REDIR_URI}&response_type=code`;
};

export const getAccessToken = (code: string) => {};
