import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../layouts/Landing";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CardLayout from "../../layouts/card";
import prisma from "../../lib/prisma";
import { EventType } from ".prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { ViewState } from '@devexpress/dx-react-scheduler';
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

    const event: Event[] = await prisma.event.findMany({
        where: {
            eventTypeId: Number(id)
        }
    });

    return {
        props: {
            event,
            eventType
        }
    }
}


const Events: React.FC<{ event: Event, eventType: EventType }> = ({ event, eventType }) => {
    let link = "localhost:3000/";
    if (typeof window === 'object') {
        // Check if document is finally loaded

    }
    const [value, setValue] = useState(`${link}/booking/${eventType?.id}`);
    const [copySuccess, setCopySuccess] = useState("copy");

    const currentDate = '2018-11-01';
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];

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
                        <div className="">
                            <Scheduler
                                data={schedulerData}
                            >
                                <ViewState
                                    currentDate={currentDate}
                                />
                                <MonthView
                                    startDate={"2020-10-1"}
                                    today={currentDate}
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

function dynamic<T>(arg0: Promise<{ (props: SchedulerProps): JSX.Element; defaultProps: import("@aldabil/react-scheduler/dist/types").SchedulerProps; }>, arg1: { ssr: boolean; }) {
    throw new Error("Function not implemented.");
}
