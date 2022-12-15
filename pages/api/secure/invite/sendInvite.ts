import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import nodemailer from 'nodemailer';

import { prisma } from 'prisma/prisma';

export type InviteData = {
  receiverEmail: string;
  projectId: string;
};

export const path = 'api/secure/invite/sendInvite';

export default async function removeWorkspace(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string } | NextApiError>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const { receiverEmail, projectId } = req.body as InviteData;

  if (!receiverEmail || !projectId) {
    return res.status(400).send({ error: 'Please check provided data' });
  }

  const userWorkspaceRole = await prisma.projectMember.findFirst({
    where: {
      memberId: session.id,
      projectId: projectId as string
    }
  });

  if (userWorkspaceRole?.roleId !== 0)
    res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  const checkUser = await prisma.user.findFirst({
    where: {
      email: receiverEmail
    },
    include: {
      ProjectMember: true
    }
  });

  if (!checkUser) return res.status(404).send({ error: 'Cannot find user with provided e-mail' });

  const memberAlreadyInProject = checkUser.ProjectMember.find((member) => {
    if (member.projectId === projectId) return member;
  });

  if (memberAlreadyInProject)
    return res.status(400).send({ error: 'User is already a member of this project' });

  //set old invitations to this project as not active
  await prisma.invitation.updateMany({
    where: {
      receiverEmail,
      projectId
    },
    data: {
      active: false
    }
  });

  const newInvitation = await prisma.invitation.create({
    data: {
      receiverEmail,
      projectId,
      invitationHost: session.id
    },
    include: {
      project: true
    }
  });

  if (!newInvitation)
    res.status(500).send({ error: 'Something went wrong please try again later' });

  //create user notification
  const userNotification = await prisma.notification.create({
    data: {
      userId: checkUser.id,
      userInvite: newInvitation.id,
      type: 'INVITATION'
    }
  });

  if (!userNotification)
    res.status(500).send({ error: 'Something went wrong please try again later' });

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });

  const sendMessage = await transporter.sendMail({
    from: '"Taskzilla 🦖" <taskzilla@noreply.com>',
    to: `${receiverEmail}`,
    subject: `🚀 Hello, you have an invite to the project ${newInvitation.project.name} from ${
      session.user.name
    } ${session.user.lastName ?? ''}`,
    text: 'Hello world?',
    html: '<b>Hello world?</b>'
  });

  if (sendMessage) {
    return res.status(200).send({ message: 'Invitation successfully send' });
  } else {
    return res.status(500).send({ error: 'Invitation send failed' });
  }
}
