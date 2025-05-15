import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import connectMongoDB from "@/database/connectMongoDB";
import { connectQueueAndWorker } from "@/app/(server)/api/BullMQ/connectBullMQAndWorker";

const config: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],

    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                session.user.image = token.picture as string;
            }
            return session;
        },

        async jwt({ token, user}) {
            if (user) {
                token.name = user.name;
                token.email = user.email;
                token.picture = user.image;
            }
            return token;
        },

        async signIn({ user }) {
            try {
                await connectMongoDB();

                const appQueue = connectQueueAndWorker();
                await appQueue.add("user-auth", { user });

                return true;
            } catch (err) {
                console.error("Error during sign-in:", err);
                return false;
            }
        },
    },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
