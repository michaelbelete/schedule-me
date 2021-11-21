import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../layouts/Landing";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CardLayout from "../../layouts/card";
import prisma from "../../lib/prisma";
import { EventType, Event } from ".prisma/client";
import { ViewState } from '@devexpress/dx-react-scheduler';
import superjson from 'superjson';
import {
    Scheduler,
    MonthView,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.query;
    const eventType: EventType = await prisma.eventType.findFirst({
        where: {
            id: Number(id)
        }
    });

    let events = await prisma.event.findMany({
        where: {
            eventTypeId: Number(id)
        },
        include: {
            attendee: true
        }
    });

    const { json, meta } = superjson.serialize(events);

    return {
        props: {
            events: json,
            eventType
        }
    }
}


const Events: React.FC<{ events: any, eventType: EventType }> = ({ events, eventType }) => {
    let link = "localhost:3000/";
    if (typeof window === 'object') {
        link = window.location.origin
    }
    const [value, setValue] = useState(`${link}/booking/${eventType?.id}`);
    const [copySuccess, setCopySuccess] = useState("copy");
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [monthOrDate, setMonthOrDate] = useState("month");
    const schedulerData = [];

    var add_minutes = function (dt, minutes) {
        return new Date(dt.getTime() + minutes * 60000);
    }

    events.forEach((event) => {
        console.log(event);
        let startDate: Date = new Date(event.startDate)
        schedulerData.push(
            { startDate: startDate.toISOString(), endDate: add_minutes(startDate, Number(eventType.duration)).toISOString(), title: `${eventType.title}  with ${event.attendee.name}` }
        )
    });

    return (
        <Layout>
            <div className="flex flex-col justify-center items-center px-36 pt-20 mb-5">
                <h1 className="text-5xl font-bold text-white">{eventType.title}</h1>
                <p className="mt-5 text-white">Create a new event and share your link to start using
                    schedule me</p>

                <div className="mt-10">
                    <div className="flex flex-row gap-5 justify-center px-8 py-3 bg-white rounded-xl item-center">
                        <input value={value} disabled className="w-96" />
                        <CopyToClipboard text={value}
                            onCopy={() => setCopySuccess("Copied")}>
                            <span>{copySuccess}</span>
                        </CopyToClipboard>
                    </div>
                </div>
            </div>
            <div className="pt-12">

                <CardLayout>
                    <div className="px-10 py-6">
                        <div className="flex flex-row justify-between pb-8">
                            <h1 className="py-8 text-4xl">Events</h1>
                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="view" className="text-sm text-gray-600">View Type</label>
                                    <select className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-gray" id="view" onChange={(e) => { setMonthOrDate(e.target.value) }}>
                                        <option value="month">Month</option>
                                        <option value="day">Day</option>
                                    </select>
                                </div>
                                {monthOrDate == "day" ? (<div className="flex flex-col gap-2">
                                    <label htmlFor="view" className="text-sm text-gray-600">Current Date</label>
                                    <input type="date" className="px-3 py-2 bg-white rounded-lg border border-gray-300 text-gray" value={currentDate} onChange={(e) => { setCurrentDate(e.target.value) }} />
                                </div>): null  }
                                
                            </div>
                        </div>
                        <div className="w-full">
                            <Scheduler
                                data={schedulerData}
                            >
                                <ViewState currentDate={currentDate} />
                                {monthOrDate == "month" ? (<MonthView />) : (<DayView
                                    startDayHour={9}
                                    endDayHour={18}
                                />)}
                                <Appointments />
                            </Scheduler>
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    )
}

export default Events;
