import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import connectMongoDB from "@/database/connectMongoDB";
import { connectQueueAndWorker } from "@/app/(server)/api/BullMQ/connectBullMQAndWorker";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Google({
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
        GitHub,
    ],

    callbacks: {
        async signIn({ user }) {
            try {
                await connectMongoDB();

                const appQueue = connectQueueAndWorker();

                const isAuthenticated = await appQueue.add("user-auth", { user });

                if (isAuthenticated) {
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.error("Error checking/saving user:", err);
                return false;
            }
        }
    }

});