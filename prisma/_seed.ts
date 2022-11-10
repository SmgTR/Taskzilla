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
