import React, { useRef, useState } from "react"
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import prisma from "../lib/prisma";
import { User } from ".prisma/client";
import LLandingHeader from "../components/loggedIn/header";
import LNavBar from "../components/loggedIn/navbar";
import PNavBar from "../components/public/navbar";
import PLandingHeader from "../components/public/header";


export const getServerSideProps: GetServerSideProps = async({req, res}) => {
  const session = await getSession({req});

  let user = {};
  if(session){
    user = await prisma.user.findFirst({
      where: {
        email: session.user.email
      }
    })
  }
  return {
    props: {
      user
    }
  }
}

const Landing: React.FC<{ user: User }> = ({user}) => {
  const [session, loading] = useSession();
  
  if(loading) {
    return(
      <div className="flex absolute flex-col justify-center items-center w-full h-full w-white">
        <h1 className="mt-12 text-3xl text-black">Loading please wait...</h1>
      </div>
    );
  }else{
    if(session) {
      return (
        <Layout>
          <LNavBar user={user} />
          <LLandingHeader user={user} />
          <CardLayout>
            <h1>Logged in</h1>
          </CardLayout>
        </Layout>
      )
    }else{
      return (
        <Layout>
          <PNavBar />
          <PLandingHeader />
          <CardLayout>
            <h1>Logged Out</h1>
          </CardLayout>
        </Layout>
      )
    }
   
  }

}

export default Landing;
// import { GetStaticProps } from "next"
// import Post, { PostProps } from "../components/Post"

// export const getStaticProps: GetStaticProps = async () => {
//   const feed = [
//     {
//       id: 1,
//       title: "Prisma is the perfect ORM for Next.js",
//       content: "[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ together!",
//       published: false,
//       author: {
//         name: "Nikolas Burk",
//         email: "burk@prisma.io",
//       },
//     },
//   ]
//   return { props: { feed } }
// }


