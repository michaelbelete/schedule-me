import React, { useRef, useState } from "react"
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import prisma from "../lib/prisma";
import { User } from ".prisma/client";
import HeaderLoggedIn from "../components/loggedIn/header";
import NavbarLoggedIn from "../components/loggedIn/navbar";
import NavbarPublic from "../components/public/navbar";
import HeaderPublic from "../components/public/header";


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
          <NavbarLoggedIn user={user} />
          <HeaderLoggedIn user={user} />
          <CardLayout>
            <h1>Logged in</h1>
          </CardLayout>
        </Layout>
      )
    }else{
      return (
        <Layout>
          <NavbarPublic />
          <HeaderPublic />
          <CardLayout>
            <h1>Logged Out</h1>
          </CardLayout>
        </Layout>
      )
    }
   
  }

}

export default Landing;



