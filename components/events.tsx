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
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: '',
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