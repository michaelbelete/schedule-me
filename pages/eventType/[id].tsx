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

    const currentDate = '2021-11-03';
    const schedulerData = [
        // { startDate: '2021-11-03T09:45', endDate: '2021-11-03T11:00', title: 'One to one meeting' },
        // { startDate: '2021-11-03T12:00', endDate: '2021-11-03T14:30', title: 'Pair programming' },
        // { startDate: '2021-11-03T12:00', endDate: '2021-11-03T15:30', title: 'Another Task' },
    ];

    var add_minutes =  function (dt, minutes) {
        return new Date(dt.getTime() + minutes*60000);
    }

    var convert_time_to_string = function(d) {
        return d.getFullYear() + "-" + d.getMonth()+"-"+d.getDay()+"T"+d.getHours()+":"+d.getMinutes()
    }


    events.forEach((event) => {
        let startDate: Date = new Date(event.startDate)
        schedulerData.push(
            { startDate: startDate.toISOString(), endDate: add_minutes(startDate, Number(eventType.duration)).toISOString(), title: eventType.title}
        )
    });

    console.log(schedulerData);
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
                        <h1 className="pb-8 text-4xl">Events</h1>
                        <div className="w-full">
                            <Scheduler
                                data={schedulerData}
                            >
                                <ViewState
                                />
                                <MonthView
                                />
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
