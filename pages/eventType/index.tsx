import React, { useState } from "react";
import CardLayout from "../../layouts/card";
import Layout from "../../layouts/Landing";
import { User } from ".prisma/client";
import Router from "next/router";


const EventType: React.FC<{ user: User }> = ({ user }) => {

    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = { title, duration, location, description };
            await fetch("/api/eventType", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then((_) => {
                Router.push("/");
            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="py-10">
                <CardLayout>
                    <div className="flex flex-row">
                        <div className="w-full h-auto bg-pink-700 rounded-l-2xl">
                            <div className="flex flex-col gap-2 px-10 py-44">
                                <h1 className="mb-5 text-5xl font-bold text-white">
                                    Create Event Type
                                </h1>
                                <p className="text-gray-200">Fill the form on the right to create event type</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 px-8 py-5">
                            <p className="text-lg font-bold">Create Event Type</p>
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
                                    required
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
                                    required
                                />
                                <label htmlFor="Duration" className="mt-2 w-full">Duration(Minutes)</label>
                                <select
                                    id="Duration"
                                    autoFocus
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="Duration"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    required>
                                        <option value="">Select Duration</option>
                                    <option value="10">10 min</option>
                                    <option value="10">15 min</option>
                                    <option value="10">30 min</option>
                                    <option value="10">1 hour</option>
                                </select>
                                <label htmlFor="Description" className="mt-2 w-full">Description</label>
                                <textarea
                                    id="Description"
                                    autoFocus
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                    className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                    value={description}
                                    required
                                ></textarea>
                                <button disabled={!location || !title || !duration || !description} className="items-center p-3 mt-5 w-full text-sm font-bold text-white bg-pink-600 rounded-3xl disabled:bg-gray-300" type="submit" >
                                    Create Event Type
                                </button>
                            </form>
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    );
}

export default EventType;