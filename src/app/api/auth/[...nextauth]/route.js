import NextAuth from "next-auth/next";
const { authOptions } = require("./options");

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};