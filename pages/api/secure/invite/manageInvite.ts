import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

type ProjectUpdateData = {
  newMemberId: string;
  invitationId: string;
  reject?: boolean;
};

export default async function manageInvite(
  req: NextApiRequest,
  res: NextApiResponse<Project | NextApiError | NextApiMsg>
) {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const { newMemberId, invitationId, reject } = req.body as ProjectUpdateData;

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      receiverEmail: session.user.email
    }
  });

  if (reject) {
    await prisma.invitation.update({
      where: {
        id: invitationId
      },
      data: {
        active: false
      }
    });
    return res.status(204).send({ message: 'Invitation rejected' });
  }

  if (!invitation || invitation.active === false)
    res
      .status(400)
      .send({ error: 'Something went wrong, invitation probably do not exist or is outdated' });

  const userProjectRole = await prisma.projectMember.findFirst({
    where: {
      memberId: session.id,
      projectId: invitation?.projectId as string
    }
  });

  if (!userProjectRole || userProjectRole?.roleId !== 0)
    res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  const projectUpdate = await prisma.project.update({
    where: {
      id: invitation?.projectId as string
    },
    data: {
      projectMember: {
        create: {
          memberId: newMemberId,
          roleId: 2
        }
      }
    }
  });

  if (!projectUpdate)
    return res
      .status(404)
      .send({ error: "Project probably do not exist or you don't have required permissions" });

  await prisma.invitation.update({
    where: {
      id: invitationId
    },
    data: {
      active: false
    }
  });

  return res.status(200).send(projectUpdate);
}
