// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed process...')

  // Seed a test user with a hashed password
  const hashedPassword = await hash('StrongPass123!', 12)
  const user = await prisma.user.upsert({
    where: { email: 'test@scent.com' },
    update: {
      passwordHash: hashedPassword,
    },
    create: {
      email: 'test@scent.com',
      firstName: 'Test',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'customer',
      emailVerified: new Date(),
    },
  })
  console.log(`Upserted user: ${user.email}`)

  // Seed a category
  const category = await prisma.category.upsert({
    where: { slug: 'essential-oils' },
    update: {},
    create: {
      name: 'Essential Oils',
      slug: 'essential-oils',
      description: 'Pure, single-note essential oils for aromatherapy.',
    },
  })
  console.log(`Upserted category: ${category.name}`)

  // Seed a product
  const product = await prisma.product.upsert({
    where: { slug: 'lavender-dreams' },
    update: {},
    create: {
      name: 'Lavender Dreams',
      slug: 'lavender-dreams',
      sku: 'EO-LAV-01',
      description:
        'Our Lavender Dreams essential oil is sourced from the high-altitude fields of Provence, France, offering a serene and calming aroma. Perfect for diffusing before bedtime or adding to a warm bath to melt away stress.',
      shortDescription: 'Pure, calming lavender oil from Provence.',
      price: 29.99,
      categoryId: category.id,
      isActive: true,
      isFeatured: true,
      scentNotes: { top: 'Herbaceous', middle: 'Floral', base: 'Sweet' },
      ingredients: ['Lavandula Angustifolia (Lavender) Oil'],
      usageInstructions: 'Add 3-5 drops to a diffuser or mix with a carrier oil for topical use.',
    },
  })
  console.log(`Upserted product: ${product.name}`)

  // Seed a variant for the product
  const variant = await prisma.productVariant.upsert({
    where: { sku: 'EO-LAV-01-15ML' },
    update: {},
    create: {
      productId: product.id,
      sku: 'EO-LAV-01-15ML',
      name: '15ml Bottle',
      price: 29.99,
      inventoryQuantity: 100,
    },
  })
  console.log(`Upserted variant: ${variant.name} for ${product.name}`)

  // Seed an image for the product
  await prisma.productImage.upsert({
    where: { url: '/images/products/lavender-dreams.jpg' },
    update: {},
    create: {
      productId: product.id,
      url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1625075658/scent/lavender_oil.jpg', // Replace with a real placeholder URL
      altText: 'A glass bottle of Lavender Dreams essential oil next to fresh lavender sprigs.',
      isPrimary: true,
    },
  })
  console.log(`Upserted image for ${product.name}`)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
