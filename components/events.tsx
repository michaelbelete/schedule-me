import DataTable from 'react-data-table-component';
import { Event } from ".prisma/client";
import React from "react";

const Events: React.FC<{ events: Event }> = ({ events }) => {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
        },
        {
            name: 'Location',
            selector: row => row.location,
        },
        {
            name: 'Start Time',
            selector: row => row.start_time,
        },
        {
            name: 'End Time',
            selector: row => row.end_time,
        },
        {
            name: 'Attendee Name',
            selector: row => row.attende.name,
        },

    ];
    
    return(
        <>x
         <DataTable
            columns={columns}
            data={events}
        />
        </>
    );
}

export default Events;