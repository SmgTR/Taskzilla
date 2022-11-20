import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { prisma } from 'prisma/prisma';

import { UserType } from '@/types/UserTypes';

export interface UserResponse {
  data: UserType;
  message: string;
}

export interface UserRequest {
  email: string;
  lastName?: string;
  image?: string;
  name: string;
  password: string;
}

export const path = '/api/user/createUser';

export default async function createUser(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse | NextApiError>
) {
  const { email, password, image, name } = req.body as UserRequest;

  const saltRounds = 10;

  if (!email || !password) res.status(500).send({ error: 'Something went wrong' });

  const hashPassword = await bcrypt.hash(password, saltRounds);

  const createNewUser = await prisma.user.create({
    data: {
      email: email,
      password: hashPassword,
      image: image || '',
      emailVerified: false,
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
