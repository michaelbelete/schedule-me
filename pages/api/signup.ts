import prisma from "../../lib/prisma"
import * as bcrypt from "bcrypt";

export default async function handle(req, res) {
  const { fullName, email, password, company } = req.body;

  const newCompany = await prisma.company.create({
    data: {
      name: company,
    },
  });

//   const newUser = await createUser(name, email, password, result.id);

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await prisma.user.create({
      data: {
          fullName: fullName,
          email: email,
          password: hashedPassword,
          company: { connect: { id: newCompany?.id } },
      }
  });

  res.json({
    user: newUser,
    company: newCompany,
  });
}
