import { Attendee } from '.prisma/client';
import prisma from '../../lib/prisma';
export default async function handle(req, res) {
  if (req.method === 'POST') {
    let { date, email, eventTypeId, fullName, time } = req.body;

    date = new Date(date); //convert string to date object
    time = time.split(':'); //split hour and minute and put it into an array eg. "8:30" to [8,30]
    date.setUTCHours(time[0], time[1]); //add hour and minute to date

    const newAttendee: Attendee = await prisma.attendee.create({
      data: {
        name: fullName,
        email: email,
      },
    });
    const newEvent = await prisma.event.create({
      data: {
        startDate: date,
        status: 'True',
        eventType: { connect: { id: eventTypeId } },
        attendee: { connect: { id: newAttendee.id } },
      },
    });
    res.json(newEvent);
  } else {
    res.status(405);
    res.end();
  }
}
