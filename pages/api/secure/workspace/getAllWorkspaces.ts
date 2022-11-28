import type { NextApiHandler } from 'next';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

export type WorkspacesResponse = {
  memberIn: Workspace[];
  guestIn: Workspace[];
};

export const path = '/api/secure/workspace/getAllWorkspaces';

export const getAllWorkspaces: NextApiHandler<WorkspacesResponse | NextApiError> = async (
  req,
  res
) => {
  const session = await getSession({ req });

  if (!session || !session.id) {
    return res.status(401).send({ error: 'You need to be authenticated to use this route' });
  }

  const workspaces = await prisma.workspace.findMany({
    where: {
      type: 'private',
      workspaceMember: {
        some: {
          memberId: session.id
        }
      }
    },
    include: {
      workspaceMember: {
        where: {
          memberId: session.id
        }
      },
      projects: {
        where: {
          OR: [
            {
              projectMember: {
                some: {
                  memberId: session.id
                }
              }
            },
            {
              type: 'public'
            }
          ]
        },
        include: {
          projectMember: true
        }
      }
    }
  });

  const guestWorkspaces = await prisma.workspace.findMany({
    where: {
      NOT: {
        workspaceMember: {
          some: {
            memberId: session.id
          }
        }
      },
      projects: {
        some: {
          projectMember: {
            some: {
              memberId: session.id
            }
          }
        }
      }
    },
    include: {
      projects: {
        where: {
          projectMember: {
            some: {
              memberId: session.id
            }
          }
        },
        include: {
          projectMember: true
        }
      }
    }
  });

  if (workspaces.length === 0 && guestWorkspaces.length === 0)
    return res
      .status(404)
      .send({ error: "You don't have any workspaces yet. Please create new workspace" });

  return res.status(200).send({
    memberIn: workspaces,
    guestIn: guestWorkspaces
  });
};

export default getAllWorkspaces;
