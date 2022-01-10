import { EventType } from ".prisma/client";
import Link from "next/link";
import React from "react";
import { AiFillClockCircle, AiFillEnvironment } from "react-icons/ai";

const EventTypeCard: React.FC<{ eventType: EventType }> = ({ eventType }) => {

    return (
        <Link href={`/eventType/${eventType.id}`}>
            <div className="p-5 w-full bg-purple-800 rounded-lg">
                <h1 className="pb-4 text-2xl font-bold text-white">{eventType.title}</h1>
                <div className="flex flex-row gap-2 pb-2">
                    <div className="flex flex-row gap-2">
                        <AiFillClockCircle size="20" className="text-gray-300" />
                        <p className="text-sm text-gray-300">{eventType.duration} min</p>
                    </div>
                    <div className="flex flex-row gap-2">
                        <AiFillEnvironment size="20" className="text-gray-300" />
                        <p className="text-sm text-gray-300">{eventType.location}</p>
                    </div>
                </div>
                <p className="pt-2 w-full text-sm text-gray-200">
                    {eventType.description}
                </p>
            </div>
        </Link>
    );
}

export default EventTypeCard;