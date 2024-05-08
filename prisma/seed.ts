import { PrismaClient, ReflectionModelType, Skills } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

const generateActionPoints = (id: string) => {
  const actionPoints = []
  for (let i = 0; i < Math.floor(Math.random() * 4 + 1); i++) {
    actionPoints.push({
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: id,
      resolved: Math.random() > 0.5,
      createdAt: faker.date.recent({ days: 20 }),
    })
  }
  return actionPoints
}

async function main() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Seed is only allowed in development environment')
  }

  await prisma.actionPoint.deleteMany()
  await prisma.reflection.deleteMany()

  //create reflection and link to user

  for(let i = 0; i < 100; i++) {
  await prisma.reflection.create({
    data: {
      title: faker.lorem.sentence(),
      content: [faker.lorem.paragraph()],
      skills: faker.helpers.arrayElements(
        Object.values(Skills),
        Math.floor(Math.random() * 3 + 1),
      ),
      reflectionType: faker.helpers.arrayElement([ReflectionModelType.STARR]),
      createdAt: faker.date.recent({ days: 20 }),
      actionPoints: {
        create: generateActionPoints('clvxn68p00000y9zsozwoitjl'),
      },
      author: {
        connect: {
          id: 'clvxn68p00000y9zsozwoitjl',
        },
      },
    },
  })
  console.log(`Reflection ${i} created`)
}
}

main()
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
