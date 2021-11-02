import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Layout from "../../layouts/Landing";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import CardLayout from "../../layouts/card";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async (context) => {

    const { id } = context.query;
    const event: Event = await prisma.event.findMany({
        where: {
            eventTypeId: Number(id)
        }
    });

    return {
        props: {
            event
        }
    }
}

const Events: React.FC<{ event: Event }> = ({ event }) => {
    return (
        <Layout>
            <div className="pt-12">
                <CardLayout>
                    <div className="px-10 py-6">
                        <h1 className="pb-8 text-4xl">Events</h1>
                        <div className="grid grid-cols-3 gap-10">
                            {event}
                        </div>
                    </div>
                </CardLayout>
            </div>
        </Layout>
    )
}

export default Events;