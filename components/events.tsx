import DataTable from 'react-data-table-component';
import { EventType } from ".prisma/client";
import React from "react";

const Events: React.FC<{ eventType: EventType }> = ({ eventType }) => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Location',
            selector: row => row.location,
        },
        {
            name: 'Start Time',
            selector: row => row.start_time,
            sortable: true,
        },
        {
            name: 'End Time',
            selector: row => row.end_time,
            sortable: true,
        },
    ];

    return(
        <>
         <DataTable
            columns={columns}
            type="text"
            data={eventType}
        />
        </>
    );
}

export default Events;