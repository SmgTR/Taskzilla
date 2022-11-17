import { getSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

import Dashboard from '@/src/layouts/Dashboard';
import { ProjectProvider } from '@/src/context/ProjectContext';
import { prisma } from 'prisma/prisma';
import { ColumnsProvider, useColumnsContext } from '@/src/context/ColumnsContext';
import Columns from '@/src/components/dashboard/columns/Columns';
import ProjectContainer from '@/src/containers/ProjectContainer';

interface Props {
  project: Project;
}

let socket: Socket;

let math = Math.floor(Math.random() * 2);

export default function Project({ project }: Props) {
  const [userList, setUserList] = useState([
    {
      email: 'test@test.com',
      name: 'template',
      id: 'dada'
    }
  ]);

  const user = [
    {
      email: 'test@test.com',
      name: 'tester1',
      id: 'dada'
    },
    {
      email: 'test1@test.com',
      name: 'tester2',
      id: 'dada'
    }
  ];

  useEffect(() => {
    socketInitializer();
    return () => {
      socket.disconnect();
    };
  }, [project.id]);

  const socketInitializer = async () => {
    await fetch('/api/socket');
    socket = io('/projectActiveUsers');

    socket.on('connect', () => {
      socket.emit('connect-user', project.id, user[math]);
    });

    socket.on('connected-users', (user) => {
      setUserList(user);
    });
  };

  return (
    <>
      <ProjectProvider project={project}>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <ColumnsProvider projectId={project.id ?? ''}>
          <Dashboard>
            <ProjectContainer />
            <Columns projectId={project.id ?? ''} />
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
