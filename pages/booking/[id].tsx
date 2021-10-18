import React, { useState } from "react";
import { GetServerSideProps } from "next";
import CardLayout from "../../layouts/card";
import Layout from "../../layouts/Landing";
import prisma from "../../lib/prisma";
import { User } from ".prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.query;

    const user = await prisma.user.findFirst({
        where: {
            id: Number(id)
        }
    })

    return {
        props: {
            user
        }
    }
}

const Booking: React.FC<{ user: User }> = ({user}) => {

    const [fullName, setFullName] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
    };
    return (
        <Layout>
            <div className="py-10">
                <CardLayout>
                    <div className="flex flex-row">
                        <div className="w-full h-auto bg-pink-700 rounded-l-2xl">
                            <div className="flex flex-col gap-2 px-10 py-44">
                                <p className="text-black">
                                    For { user.fullName }
                                </p>
                                <h1 className="text-5xl font-bold text-white">
                                    Create Event
                                </h1>
                                <p className="text-black">Fill the form on the right to create event with <b>{ user.fullName }</b></p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-8 py-5">
                            <p className="text-lg font-bold">Create Event</p>
                            <form onSubmit={submitData}>
                                <label htmlFor="title" className="w-full">Title</label>
                                <input
                                    id="title"
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={title}
                                />
                                <label htmlFor="Location" className="mt-2 w-full">Location</label>
                                <input
                                    id="Location"
                                    autoFocus
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={location}
                                />

                                <label htmlFor="FullName" className="mt-2 w-full">Full Name</label>
                                <input
                                    id="FullName"
                                    autoFocus
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Full Name"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={fullName}
                                />

                                <label htmlFor="Email" className="mt-2 w-full">Email</label>
                                <input
                                    id="Email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    type="text"
                                    value={email}
                                />

                                <div className="flex flex-row gap-4">
                                    <div>
                                        <label htmlFor="StartTime" className="mt-2 w-full">Start Time</label>
                                        <input
                                            id="StartTime"
                                            autoFocus
                                            onChange={(e) => setStartTime(e.target.value)}
                                            placeholder="Start Time"
                                            className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                            type="text"
                                            value={startTime}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="EndTime" className="mt-2 w-full">End Time</label>
                                        <input
                                            id="EndTime"
                                            autoFocus
                                            onChange={(e) => setEndTime(e.target.value)}
                                            placeholder="End Time"
                                            className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                            type="text"
                                            value={endTime}
                                        />
                                    </div>
                                </div>
                                <input disabled={!location || !title || !fullName || !email || !startTime || !endTime} className="items-center p-3 mt-5 w-full text-sm font-bold text-white bg-pink-600 rounded-3xl disabled:opacity-80" type="submit" value="Schedule a meeting" />
                            </form>
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    );
}

export default Booking;