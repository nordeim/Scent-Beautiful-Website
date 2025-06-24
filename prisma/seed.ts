import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Seed a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@scent.com' },
    update: {},
    create: {
      email: 'test@scent.com',
      name: 'Test User',
      password: 'password',
      role: 'customer',
    },
  })

  // Seed a category
  const category = await prisma.category.upsert({
    where: { slug: 'aromatherapy' },
    update: {},
    create: {
      name: 'Aromatherapy',
      slug: 'aromatherapy',
    },
  })

  // Seed a product
  await prisma.product.upsert({
    where: { slug: 'lavender-oil' },
    update: {},
    create: {
      name: 'Lavender Essential Oil',
      slug: 'lavender-oil',
      description: 'Premium lavender oil for relaxation.',
      price: 29.99,
      categoryId: category.id,
      isActive: true,
      isFeatured: true,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
