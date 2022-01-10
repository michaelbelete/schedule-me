import React, { useRef, useState } from "react"
import CardLayout from "../layouts/card";
import Layout from "../layouts/Landing";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/client";
import prisma from "../lib/prisma";
import { Event, EventType, User } from ".prisma/client";
import HeaderLoggedIn from "../components/loggedIn/header";
import NavBarLoggedIn from "../components/loggedIn/navbar";
import NavBarPublic from "../components/public/navbar";
import HeaderPublic from "../components/public/header";
import Events from "../components/events";
import NavbarPublic from "../components/public/navbar";
import { AiFillClockCircle, AiFillEnvironment } from "react-icons/ai";
import EventTypeCard from "../components/eventTypeCard";


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (session) {
    const user: User = await prisma.user.findFirst({
      where: {
        email: session.user.email
      }
    });

    const eventTypes: EventType[] = await prisma.eventType.findMany({
      where: {
        userId: user.id
      },
      orderBy: { id: "desc" }
    });
    return {
      props: {
        user,
        eventTypes
      }
    }
  } else {
    // if the user not logged in
    //show public data fetched
    return {
      props: {

      }
    }
  }
}

const Landing: React.FC<{ user: User, eventTypes: EventType[] }> = ({ user, eventTypes }) => {
  const [session, loading] = useSession();

  if (loading) {
    return (
      <div className="flex absolute flex-col justify-center items-center w-full h-full w-white">
        <h1 className="mt-12 text-3xl text-black">Loading please wait...</h1>
      </div>
    );
  } else {
    if (session) {
      const generateEventType = () => {
        let result = [];
        eventTypes.forEach((eventType) => {
          result.push(<EventTypeCard eventType={eventType} />)
        })

        return result;
      }

      return (
        <Layout>
          <NavBarLoggedIn user={user} />
          <HeaderLoggedIn user={user} />
          <div className="pb-44">
            <CardLayout>
              <div className="px-10 py-6">
                <h1 className="pb-8 text-4xl">Event Types</h1>
                <div className="grid grid-cols-3 gap-10">
                  {generateEventType()}
                </div>
                <pre>
                </pre>
              </div>
            </CardLayout>
          </div>
        </Layout>
      )
    } else {
      return (

        <Layout>
          <NavBarPublic />
          <HeaderPublic />
          <div className="my-3">
            <CardLayout>
              <div className="flex flex-col items-center px-10 pt-10">
                <p className="text-gray-700">How it works</p>
                <h1 className="pt-2 text-3xl font-bold">See Schedule me in action</h1>
              </div>
              <div className="flex flex-row justify-between items-center px-10 py-10">
                <div className="flex flex-col items-center">
                  <div className="px-7 py-5 w-20 h-20 bg-gray-300 rounded-full">
                    <h1 className="text-4xl font-bold text-pink-700">1</h1>
                  </div>
                  <h3 className="pt-3 font-bold text-pink-600">
                    Create an event
                  </h3>
                  <p className="pt-3 w-72 text-center">
                    Let as know your availability
                    preferences and it’ll do the work for
                    you.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="px-7 py-5 w-20 h-20 bg-gray-300 rounded-full">
                    <h1 className="text-4xl font-bold text-pink-700">2</h1>
                  </div>
                  <h3 className="pt-3 font-bold text-pink-600">
                    Share your link
                  </h3>
                  <p className="pt-3 w-72 text-center">
                    Send guests your schedule me link or
                    embed it on your website.
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="px-7 py-5 w-20 h-20 bg-gray-300 rounded-full">
                    <h1 className="text-4xl font-bold text-pink-700">3</h1>
                  </div>
                  <h3 className="pt-3 font-bold text-pink-600">
                    Get booked
                  </h3>
                  <p className="pt-3 w-72 text-center">
                    They pick a time and the event is
                    added to your calendar.
                  </p>
                </div>
              </div>
            </CardLayout>
          </div>
        </Layout>
      )
    }

  }

}

export default Landing;



