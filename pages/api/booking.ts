import prisma from '../../lib/prisma';
export default async function handle(req, res) {
  const { fullName, title, location, email, startTime, endTime, userId } =
    req.body;

  const newAttendee = await prisma.attende.create({
    data: {
      name: fullName,
      email: email,
    },
  });

  const newEvent = await prisma.event.create({
    data: {
      title: title,
      location: location,
      start_time: startTime,
      end_time: endTime,
      user: { connect: { id: userId } },
      attende: { connect: { id: newAttendee.id } },
    },
  });

  res.json({
    event: newEvent,
    attende: newAttendee,
  });
}
