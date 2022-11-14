import { prisma } from './prisma';

async function main(): Promise<void> {
  const tagTemplate = await prisma.tagTemplate.findFirst({ where: undefined });
  if (!tagTemplate) {
    await prisma.tagTemplate.createMany({
      data: [
        {
          color: 'C94343'
        },
        {
          color: 'F5C61D'
        },
        {
          color: '4EAFA9'
        }
      ]
    });

    console.log('Added empty layout templates.');
  }

  const roleTemplate = await prisma.projectRole.findFirst({ where: undefined });
  if (!roleTemplate) {
    await prisma.projectRole.createMany({
      data: [
        {
          id: 0,
          name: 'admin',
          update: true
        },
        {
          id: 1,
          name: 'moderator',
          update: true
        },
        {
          id: 2,
          name: 'member',
          update: false
        }
      ]
    });

    console.log('Added project role templates');
  }
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

export default main;
