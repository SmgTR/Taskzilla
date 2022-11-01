import { getSession } from 'next-auth/react';

import Dashboard from '@/src/layouts/Dashboard';
import { ProjectProvider } from '@/src/context/ProjectContext';
import { prisma } from 'prisma/prisma';
import { createColumn } from '@/src/network/secure/column/createColumn';
import { ColumnsProvider } from '@/src/context/ColumnsContext';
import Columns from '@/src/components/dashboard/columns/Columns';
import ProjectContainer from '@/src/containers/ProjectContainer';

interface Props {
  project: Project;
}

export default function Project({ project }: Props) {
  return (
    <>
      <ProjectProvider project={project}>
        <ColumnsProvider projectId={project.id ?? ''}>
          <Dashboard>
            <Columns />
            <ProjectContainer />
            <button
              type="button"
              onClick={() => {
                createColumn({
                  name: 'new Column',
                  projectId: project.id ?? ''
                });
              }}
            >
              Add Column
            </button>
          </Dashboard>
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
          permanent: false
        }
      };
    }
  }
}
