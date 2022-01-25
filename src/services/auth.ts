import { service } from './apiService';
export const DefaultHeaders = {
    'content-type': 'application/json',
            'accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}

export const AuthProfileService = `${service}/account/me`;
export const AuthService = `${service}/account/login`;

export type SignInData = {
    email : string
    password : string
    rememberAccount?: boolean
}

export async function authenticate(data : SignInData) {
    let authenticate = await fetch(AuthService, {
        method: 'POST',
        headers: DefaultHeaders,
        body: JSON.stringify(
            {
                'auth_by': 'email',
                'email': data.email,
                'password': data.password
            }
        )

    });

    return authenticate;
}

export async function GetUserLoggedIn(token: string) {
    console.log('verify auth in backend...')
    let authenticate = await fetch(AuthProfileService, {
        method: 'GET',
        headers: {
            ...DefaultHeaders,
            'Authorization': `Bearer ${token}`
        }
    });
    
    return authenticate;
}