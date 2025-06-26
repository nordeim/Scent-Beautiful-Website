// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seed process...')

  // Clear existing data to ensure a clean slate
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('Cleared existing data.')


  // Seed a test user
  const hashedPassword = await hash('StrongPass123!', 12)
  const user = await prisma.user.create({
    data: {
      email: 'test@scent.com',
      firstName: 'Test',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'customer',
      emailVerified: new Date(),
    },
  })
  console.log(`Created user: ${user.email}`)

  // Seed categories
  const oilsCategory = await prisma.category.create({
    data: {
      name: 'Essential Oils',
      slug: 'essential-oils',
      description: 'Pure, single-note essential oils for aromatherapy.',
    },
  })
  const soapsCategory = await prisma.category.create({
    data: {
      name: 'Natural Soaps',
      slug: 'natural-soaps',
      description: 'Handcrafted soaps with natural ingredients and essential oils.',
    },
  })
  console.log(`Created categories: ${oilsCategory.name}, ${soapsCategory.name}`)


  // --- Seed Products using Nested Writes ---

  // Product 1: Lavender Dreams
  await prisma.product.create({
    data: {
      name: 'Lavender Dreams',
      slug: 'lavender-dreams',
      sku: 'EO-LAV-01',
      description: 'Our Lavender Dreams essential oil is sourced from the high-altitude fields of Provence, France, offering a serene and calming aroma. Perfect for diffusing before bedtime or adding to a warm bath to melt away stress.',
      shortDescription: 'Pure, calming lavender oil from Provence.',
      price: 29.99,
      categoryId: oilsCategory.id,
      isActive: true,
      isFeatured: true,
      variants: {
        create: [
          {
            sku: 'EO-LAV-01-15ML',
            name: '15ml Bottle',
            price: 29.99,
            inventoryQuantity: 100,
          },
        ],
      },
      images: {
        create: [
          {
            url: 'https://images.unsplash.com/photo-1622683099321-2f3427494a9a?q=80&w=1974&auto=format&fit=crop',
            altText: 'A glass bottle of Lavender Dreams essential oil next to fresh lavender sprigs.',
            isPrimary: true,
          },
        ],
      },
    },
  })
  console.log('Created product: Lavender Dreams');

  // Product 2: Citrus Burst
  await prisma.product.create({
    data: {
      name: 'Citrus Burst Oil',
      slug: 'citrus-burst-oil',
      sku: 'EO-CIT-02',
      description: 'An uplifting blend of sweet orange, lemon, and grapefruit essential oils to energize your space and mood.',
      shortDescription: 'Energizing blend of citrus oils.',
      price: 24.99,
      categoryId: oilsCategory.id,
      isActive: true,
      isFeatured: true,
      variants: {
        create: [{ sku: 'EO-CIT-02-15ML', name: '15ml Bottle', price: 24.99, inventoryQuantity: 80 }],
      },
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1616019949433-6623351333b2?q=80&w=2080&auto=format&fit=crop', altText: 'A bottle of citrus oil surrounded by fresh citrus fruits.', isPrimary: true }],
      },
    },
  })
  console.log('Created product: Citrus Burst Oil');

    // Product 3: Rose Petal Soap
  await prisma.product.create({
    data: {
      name: 'Rose Petal Soap',
      slug: 'rose-petal-soap',
      sku: 'SOAP-ROS-01',
      description: 'A luxurious, handcrafted soap infused with real rose petals and nourishing shea butter.',
      shortDescription: 'Hydrating soap with real rose petals.',
      price: 12.50,
      categoryId: soapsCategory.id,
      isActive: true,
      isFeatured: false,
      variants: {
        create: [{ sku: 'SOAP-ROS-01-BAR', name: '120g Bar', price: 12.50, inventoryQuantity: 150 }],
      },
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1607006472855-c42e6833636b?q=80&w=1974&auto=format&fit=crop', altText: 'A bar of pink soap with rose petals embedded in it.', isPrimary: true }],
      },
    },
  })
  console.log('Created product: Rose Petal Soap');


  console.log('Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
