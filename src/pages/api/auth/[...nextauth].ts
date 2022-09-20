import { query as q } from "faunadb";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        url: "https://github.com/login/oauth/authorize",
        params: { scope: "read:user" },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const { email } = user;

      await fauna.query(
        q.Create(
          q.Collection('users'),
          { data: { email } }
        )
      );

      return true;
    },
  }
});