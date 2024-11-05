
import { AuthOption } from "@/libs/authOption";
import NextAuth from "next-auth";

const handler = NextAuth(AuthOption)

export { handler as GET, handler as POST }