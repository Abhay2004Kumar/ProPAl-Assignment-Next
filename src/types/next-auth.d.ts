import 'next-auth'
import { DefaultSession } from 'next-auth';
//redefining
declare module 'next-auth' {
    interface User{
        _id?: String;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: String
    }

    interface  Session{
        user: {
        _id?: String;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: String
        } & DefaultSession['user']
    }
} 

declare module 'next-auth/jwt' {
    interface JWT{
        id?: String;
        isVerified?: boolean;
        isAcceptingMessages?: boolean;
        username?: String
    }
}