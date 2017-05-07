import { api } from './api';

const auth = {
    authUri: 'http://localhost:9999/authenticate/',
    redirectUri: 'http://localhost:8080',
    clientId: 'caf9e03a36ecdaadcfb1',
};

if (process.env.ENV === 'production') {
    auth.authUri = `${api}/rrlero/git-blog/api/oauth?code=`;
    auth.redirectUri = 'http://acid.zzz.com.ua';
    auth.clientId = '48f5b894f42ae1f869d2';
};

export { auth };
