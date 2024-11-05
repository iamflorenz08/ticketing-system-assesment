import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API, APIBASEV1 } from "@/constants/Api";
import { fetchData } from "@/libs/fetch";
import { IUser } from "@/models/User";

export const AuthOption: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: 'text' },
                password: { label: "Password", type: 'password' }
            },
            async authorize(credentials) {
                const { success, message, data } = await fetchData<IUser>(APIBASEV1(API.auth.signIn), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                })

                if (!success) throw new Error(message)

                return {
                    id: data?._id,
                    email: data?.email,
                    image: data?.image
                } as User
            },
        })
    ],
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    }
}