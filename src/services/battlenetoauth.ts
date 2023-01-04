const API_URL = 'https://oauth.battle.net/authorize';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIR_URI = 'http://localhost:3000';

const scopes = ['wow.profile'];

export const getBnetAuth = (): string => {
    return `${API_URL}?client_id=${CLIENT_ID}&scope=${scopes.join(
        '%20'
    )}&state=codestate&redirect_uri=${REDIR_URI}&response_type=code`;
};
