import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type ProjectUpdateData = {
  newMemberId: string;
  invitationId: string;
  reject?: boolean;
};

export const path = '/api/secure/invitation/manageInvitation';

export default async function manageInvitation(
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

  if (!invitation || invitation.active === false)
    res
      .status(400)
      .send({ error: 'Something went wrong, invitation probably do not exist or is outdated' });

  if (reject) {
    await prisma.invitation.update({
      where: {
        id: invitationId
      },
      data: {
        active: false
      }
    });
    return res.status(200).send({ message: 'Invitation rejected' });
  }

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
    },
    include: {
      workspace: {
        include: {
          projects: {
            where: {
              projectMember: {
                some: {
                  memberId: newMemberId
                }
              }
            }
          }
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
