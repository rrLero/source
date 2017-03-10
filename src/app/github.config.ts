// Configuration for GitHub Application
export const DEV = {
    client_id: '9ef82b07caf06c5561f5',
    client_secret: 'd96675528726a49606a950e5a022fd483a4207b7',
    redirect_uri: 'http://localhost:8080/auth_github',
};

export const PROD = {};

export default {
    DEV,
    PROD,
}