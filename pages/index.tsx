import type { GetServerSideProps, NextPage } from 'next';
import styles from '../styles/Home.module.css';
import { getSession } from 'next-auth/react';
import { prisma } from 'prisma/prisma';

import MainPage from '@/src/layouts/MainPage';
import Dashboard from '@/src/layouts/Dashboard';
import { WorkspaceProvider } from '@/src/context/WorkspacesContext';
import WorkspacesList from '@/src/components/dashboard/workspacesList/WorkspacesList';

interface WorkspaceOutput {
  memberIn: Workspace[];
  guestIn: Workspace[];
}

const Home: NextPage<{ loggedIn: any; workspaces?: WorkspaceOutput }> = ({
  loggedIn,
  workspaces
}) => {
  console.log(workspaces?.memberIn, 'memberIn');
  return (
    <div className={styles.container}>
      {loggedIn ? (
        <WorkspaceProvider
          memberIn={workspaces?.memberIn ?? []}
          guestIn={workspaces?.guestIn ?? []}
        >
          <Dashboard>
            <WorkspacesList />
          </Dashboard>
        </WorkspaceProvider>
      ) : (
        <MainPage />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (session) {
    const id: string = session.id as string;

    const workspaces = await prisma.workspace.findMany({
      where: {
        type: 'private',
        workspaceMember: {
          some: {
            memberId: id
          }
        }
      },
      include: {
        projects: {
          where: {
            OR: [
              {
                projectMember: {
                  some: {
                    memberId: id
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
              memberId: id
            }
          }
        },
        projects: {
          some: {
            projectMember: {
              some: {
                memberId: id
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
                memberId: id
              }
            }
          },
          include: {
            projectMember: true
          }
        }
      }
    });
    const workspaceOutput =
      workspaces.length === 0 && guestWorkspaces.length === 0
        ? { emptySpace: true }
        : {
            workspaces: {
              memberIn: JSON.parse(JSON.stringify(workspaces)),
              guestIn: JSON.parse(JSON.stringify(guestWorkspaces))
            }
          };

    return {
      props: { loggedIn: session, workspaces: workspaceOutput.workspaces }
    };
  }

  return {
    props: { loggedIn: session }
  };
};

export default Home;
