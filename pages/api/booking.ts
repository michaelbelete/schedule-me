import { Attendee } from '.prisma/client';
import prisma from '../../lib/prisma';
export default async function handle(req, res) {
  const { date, email, eventTypeId, fullName, time } = req.body;

  const newAttendee: Attendee = await prisma.attendee.create({
    data: {
      name: fullName,
      email: email,
    },
  });

  const newEvent = await prisma.event.create({
    data: {
      startDate: new Date(`${date}T${time}:00`),
      status: 'True',
      eventType: { connect: { id: eventTypeId } },
      attendee: { connect: { id: newAttendee?.id } },
    },
  });

  res.json({
    ...newEvent,
  });
}
