import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { prisma } from 'prisma/prisma';

import { UserType } from '@/types/UserTypes';

interface UserResponse {
  data: UserType;
  message: string;
}

export default async function createWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | { error: string }>
) {
  const { email, password, image, name } = req.body;

  const saltRounds = 10;

  if (!email || !password) res.status(500).send({ error: 'Something went wrong' });

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const createNewUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
      image: image || '',
      emailVerified: new Date(),
      name: name || ''
    }
  });

  if (!createNewUser || !createNewUser.email || !createNewUser.id)
    res.status(500).send({ error: 'Something went wrong' });

  const newUser = {
    id: createNewUser.id,
    email: createNewUser.email,
    image: createNewUser.image || ''
  };

  return res.status(201).send({ message: 'User created', data: newUser });
}
