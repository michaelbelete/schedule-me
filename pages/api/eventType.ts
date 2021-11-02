import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';

export default async function handle(req, res) {
  const { title, duration, location, description } = req.body;
  const session = await getSession({ req });

  const newEventType = await prisma.eventType.create({
    data: {
      title: title,
      duration: duration,
      location: location,
      description: description,
      user: { connect: { email: session?.user.email } },
    },
  });

  res.json(newEventType);
}
