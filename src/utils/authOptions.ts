import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
    export interface Session {
        user?: {
            id: string;
            name: string;
            email: string;
            accessToken: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
    }

    interface JWT {
        id: string;
        accessToken: string;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`https://joychandrauday-backend.vercel.app/api/auth/login`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials),
                    });
                    const user = await res.json();
                    console.log(user);
                    if (!res.ok) throw new Error(user.message || "Login failed");

                    return {
                        id: user.data.id,
                        name: user.data.name,
                        email: user.data.email,
                        token: user.data.token,
                    } as User;
                } catch (error) {
                    throw new Error((error as Error).message || "Login failed");
                }
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (!session.user) {
                session.user = { id: "", name: "", email: "", accessToken: "" };
            }

            session.user.id = String(token.id ?? '');
            session.user.accessToken = String(token.accessToken ?? '');

            return session;
        }

    }
};
