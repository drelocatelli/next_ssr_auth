import { createContext, useEffect, useState } from "react";
import { authenticate, AuthService, DefaultHeaders, GetUserLoggedIn, SignInData } from "../services/auth";
import { setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import router from "next/router";
import HourConversion from "../utils/TimeConversion";
import DaysConversion from "../utils/TimeConversion";

type User = {
    id?: string
    name?: string
    created_at?: string
    preferences?: object
    email: string
    token: string
}

type AuthContextType = {
    isAuthenticated: boolean
    user: User
    setUser: User | any
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }) {

    const [user, setUser] = useState<User | any>(null);

    const isAuthenticated = !!user;

    useEffect(() => {
        //! check if user already authenticated
        const { 'nextauth.token': token } = parseCookies();
        if (token) {
            let retrieveUser = GetUserLoggedIn(token);
            retrieveUser
                .then(response => response.json())
                .then(response => {
                    setUser(response)
                    // router.push('/dashboard');
                }).catch(err => {
                    console.log(err.response)
                })
        }

    }, []);

    if (!!user)
        console.log('user:', user)

    // *        Auth
    async function signIn(data: SignInData) {
        let auth = await authenticate(data);

        console.log(data.rememberAccount)
        auth.json()
            .then(response => {
                let token = response.content.token['access_token'];
                
                setCookie(undefined, 'nextauth.token', token, {
                    maxAge: (data.rememberAccount) ? DaysConversion(30) : HourConversion(1)}),
        setUser({ email: data.email, token });
    }).catch (err => {
        console.log(err.response)
    })


    Router.push('/dashboard');

}

return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, signIn }}>
        {children}
    </AuthContext.Provider>
);
    
}