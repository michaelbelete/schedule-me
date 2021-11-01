import React, { useState } from "react";
import { GetServerSideProps } from "next";
import CardLayout from "../../layouts/card";
import Layout from "../../layouts/Landing";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { AiFillClockCircle, AiFillEnvironment } from "react-icons/ai";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { eventTypeId } = context.query;
    const eventType = {

    }

    return {
        props: {
            eventType
        }
    }
}

const Booking: React.FC<{ eventType: any }> = ({ eventType }) => {
    const [selectedDay, setSelectedDay] = useState();
    const selectedDate = (selectedDay == null) ? "" : new Date(`${selectedDay?.day}/${selectedDay?.month}/${selectedDay?.year}`);
    const selectedDateString = (selectedDay == null) ? "" : selectedDate.toDateString();

    let timepicker = [];
    let time = true;
    for (let index = 0; index < 23; index++) {
        timepicker.push(
            <button key={index} className="py-2 mb-4 w-full text-2xl text-center text-white bg-purple-800 rounded-lg border-2 cursor-pointer">
                {index}:{time ? "00" : "30"}
            </button> 
        );
        time = !time;
    }

    return (
        <Layout>
            <div className="py-14">
                <CardLayout>
                    <div className="grid grid-cols-8 gap-5 px-10 py-7">
                        <div className="flex flex-col col-span-3 pt-6">
                            <div className="w-16 h-16 text-white bg-pink-700 rounded-full">
                                <h1 className="px-4 py-3 text-4xl font-bold text">M</h1>
                            </div>
                            <h2 className="pt-3 pb-1 text-lg text-gray-600">Michael</h2>
                            <h1 className="pb-4 text-3xl font-bold text-gray-700">Event Type Title</h1>
                            <div className="flex flex-row gap-2">
                                <AiFillClockCircle size="25" className="text-gray-500" />
                                <p className="text-base text-gray-500">30 min</p>
                            </div>
                            <div className="flex flex-row gap-2 py-2">
                                <AiFillEnvironment size="25" className="text-gray-500" />
                                <p className="text-base text-gray-500">Location</p>
                            </div>
                            <p className="pt-2 w-full text-sm text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos non optio, perferendis doloribus amet, exercitationem voluptatibus minim</p>
                        </div>
                        <div className="col-span-3">
                            <p className="py-5 text-lg font-bold">Select Date and time</p>
                            <Calendar
                                value={selectedDay}
                                onChange={setSelectedDay}
                                shouldHighlightWeekends
                            />
                        </div>
                        <div className="col-span-2 pt-24">
                            <div className="pb-3 text-sm font-bold text-gray-700">{selectedDateString}</div>
                            {(selectedDateString) ? (
                                <div className="overflow-x-hidden overflow-y-scroll h-96">
                                    {timepicker}
                                </div>
                            ) : ""}
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    )
}

export default Booking;