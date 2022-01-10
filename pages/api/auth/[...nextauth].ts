import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import prisma from "../../../lib/prisma";
import * as bcrypt from "bcrypt";

let user = null;

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
          include: {
            company: {
              select: { name: true }
            }
          }
        });

        if (user !== null) {
          const isMatch = await bcrypt.compare(
            credentials.Password,
            user.password
          );
          if (isMatch) {
            return {
              name: user.fullName,
              email: user.email,
              image: user.company.name,
              ...user
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
};
export default (req, res) => NextAuth(req, res, configuration);
