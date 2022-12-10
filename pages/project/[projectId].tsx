import { getSession } from 'next-auth/react';

import Dashboard from '@/src/layouts/Dashboard';
import { ProjectProvider } from '@/src/context/ProjectContext';
import { prisma } from 'prisma/prisma';
import { ColumnsProvider } from '@/src/context/ColumnsContext';
import Columns from '@/src/components/dashboard/columns/Columns';
import ProjectContainer from '@/src/containers/dashboard/ProjectContainer';
import { ActiveUsersProvider } from '@/src/context/ActiveUsersContext';
import { useEffect, useState } from 'react';

interface Props {
  project: Project;
}

export default function Project({ project }: Props) {
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    setProjectId(project.id ?? '');
  }, [project]);

  return (
    <>
      <ProjectProvider project={project}>
        <ColumnsProvider projectId={project.id ?? ''}>
          <ActiveUsersProvider>
            <Dashboard project={project}>
              <ProjectContainer />
              <Columns projectId={project.id ?? ''} />
            </Dashboard>
          </ActiveUsersProvider>
        </ColumnsProvider>
      </ProjectProvider>
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx);

  if (ctx.query.projectId && session) {
    const id: string = session.id as string;
    const project = await prisma.project.findFirst({
      where: {
        OR: [
          {
            id: ctx.query.projectId,
            type: 'private',
            projectMember: {
              some: {
                memberId: id
              }
            }
          },
          {
            id: ctx.query.projectId,
            type: 'public',
            workspace: {
              workspaceMember: {
                some: {
                  memberId: id
                }
              }
            }
          },
          {
            id: ctx.query.projectId,
            type: 'public',
            workspace: {
              type: 'public'
            }
          }
        ]
      },
      include: {
        projectMember: true,
        Column: true
      }
    });

    if (project) {
      return {
        props: { session, project: JSON.parse(JSON.stringify(project)) }
      };
    } else {
      return {
        redirect: {
          destination: '/404',
          permanent: true
        }
      };
    }
  }
}
