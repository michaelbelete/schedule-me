import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";

let userAccount = null;

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    Providers.Credentials({
      name: "credentials",
      credentials: {
        Email: {
          type: "text",
          placeholder: "Email",
        },
        Password: {
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.Email,
          },
        });

        if (user !== null) {
          const isMatch = await bcrypt.compare(
            credentials.Password,
            user.password
          );
          if (isMatch) {
            userAccount = user;
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect(url, baseUrl) {
      return "/";
    },
    async session(session, token) {
      const result = await prisma.company.findUnique({
        where: {
          id: userAccount.companyId,
        },
      });
      const data = {
        name: result.name,
        email: userAccount.email,
      };
      if (userAccount !== null) {
        session.user = data;
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.userId === typeof undefined))
      ) {
        session.user = data;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};
export default (req, res) => NextAuth(req, res, configuration);
