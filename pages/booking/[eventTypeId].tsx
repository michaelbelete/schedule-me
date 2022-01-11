import React, { useState } from "react";
import { GetServerSideProps } from "next";
import CardLayout from "../../layouts/card";
import Layout from "../../layouts/Landing";
import TimePicker from "../../components/timePicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { AiFillClockCircle, AiFillEnvironment, AiOutlineArrowLeft } from "react-icons/ai";
import Router from "next/router";
import prisma from "../../lib/prisma";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { eventTypeId } = context.query;

    const eventType = await prisma.eventType.findFirst({
        where: {
            id: Number(eventTypeId)
        },
        include: {
            user: {
                select: {
                    fullName: true
                }
            }
        }
    });

    return {
        props: {
            eventType
        }
    }
}

const Booking: React.FC<{ eventType: any }> = ({ eventType }) => {
    const [selectedDay, setSelectedDay] = useState();
    const [selectedTime, setSelectedTime] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [nextStep, setNextStep] = useState(false);
    const selectedDateDefault = `${selectedDay?.year}-${selectedDay?.month}-${selectedDay?.day}`;
    const selectedDate = (selectedDay == null) ? "" : new Date(selectedDateDefault);
    const selectedDateString = (selectedDay == null) ? "" : selectedDate.toDateString();

    const submitData = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            const body = {
                eventTypeId: eventType?.id, date: selectedDate, time: selectedTime, fullName: name, email: email
            };

            await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then((res) => {
                toast.success('Event Booked', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    onClose: () => { Router.push("/") }
                });

            }).catch((error) => {
                console.log(error)
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Layout>
            <div className="py-14">
                <CardLayout>
                    <div className="grid grid-cols-8 gap-5 px-10 py-7">
                        <div className="flex flex-col col-span-3 pt-6">
                            <div className="w-16 h-16 text-white bg-pink-700 rounded-full">
                                <h1 className="px-4 py-3 text-4xl font-bold text">  {eventType.user.fullName.substr(0, 1).toUpperCase()}</h1>
                            </div>
                            <h2 className="pt-3 pb-1 text-lg text-gray-600">{eventType.user.fullName}</h2>
                            <h1 className="pb-4 text-3xl font-bold text-gray-700">{eventType.title}</h1>
                            <div className="flex flex-row gap-2">
                                <AiFillClockCircle size="25" className="text-gray-500" />
                                <p className="text-base text-gray-500">{eventType.duration} {eventType.duration == 1 ? "Hour" : "Minutes"}</p>
                            </div>
                            <div className="flex flex-row gap-2 py-2">
                                <AiFillEnvironment size="25" className="text-gray-500" />
                                <p className="text-base text-gray-500">{eventType.location} </p>
                            </div>
                            <p className="pt-2 w-full text-sm text-gray-800">
                                {eventType.description}
                            </p>
                        </div>
                        {nextStep ? (
                            <>
                                <div className="col-span-4">
                                    <div className="flex flex-row gap-6 pb-10">
                                        <button onClick={() => { setNextStep(false) }}><AiOutlineArrowLeft size="23" className="mt-2" /></button>
                                        <p className="pt-1 text-lg font-bold">Enter Details</p>
                                    </div>
                                    <form onSubmit={submitData}>
                                        <label htmlFor="fullName" className="w-full">Full Name</label>
                                        <input
                                            id="fullName"
                                            autoFocus
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="FUll Name"
                                            className="px-3 py-2 my-2 w-full rounded-xl border-2 border-gray-300"
                                            type="text"
                                            value={name}
                                            required
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
                                            required
                                        />
                                        <input disabled={!name || !email} className="items-center p-3 mt-5 w-full text-sm font-bold text-white bg-pink-600 rounded-3xl disabled:opacity-80" type="submit" value="Schedule Event" />
                                    </form>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-span-3">
                                    <p className="py-5 text-lg font-bold">Select Date and time</p>
                                    <Calendar
                                        value={selectedDay}
                                        onChange={setSelectedDay}
                                        shouldHighlightWeekends
                                    />
                                </div>
                                <div className="col-span-2 pt-16">
                                    <div className="pb-3 text-sm font-bold text-gray-700">{selectedDateString}</div>
                                    <div className="pb-3 text-sm font-bold text-gray-700">{selectedTime}</div>

                                    {(selectedDateString) ? (
                                        <TimePicker duration={eventType.duration} onClick={setSelectedTime} />
                                    ) : ""}
                                </div>
                            </>
                        )}

                    </div>

                    <div className="flex flex-row-reverse px-10 pb-6">
                        <button onClick={() => { setNextStep(true) }} className={"px-6 py-1 text-white rounded-lg " + (selectedTime && nextStep == false ? " bg-pink-700" : "hidden")}>Next</button>
                    </div>
                </CardLayout>
            </div>
            <ToastContainer />
        </Layout>
    )
}

export default Booking;