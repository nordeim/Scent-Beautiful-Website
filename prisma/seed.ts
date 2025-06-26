// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  // 1. Clear existing data to ensure a clean slate
  // Delete in an order that respects foreign key constraints
  console.log('   - Deleting existing data...')
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('   ✓ Existing data cleared.')

  // 2. Seed a test user
  const hashedPassword = await hash('StrongPass123!', 12)
  const user = await prisma.user.create({
    data: {
      email: 'test@thescent.com',
      firstName: 'Test',
      lastName: 'User',
      passwordHash: hashedPassword,
      role: 'customer',
      emailVerified: new Date(),
    },
  })
  console.log(`   ✓ Created user: ${user.email}`)

  // 3. Seed categories
  const oilsCategory = await prisma.category.create({
    data: {
      name: 'Essential Oils',
      slug: 'essential-oils',
      description: 'Pure, single-note and blended essential oils for aromatherapy.',
      imageUrl: 'https://images.unsplash.com/photo-1598343204273-ade0275a5078?q=80&w=2070&auto=format&fit=crop',
    },
  })

  const soapsCategory = await prisma.category.create({
    data: {
      name: 'Natural Soaps',
      slug: 'natural-soaps',
      description: 'Handcrafted soaps with natural ingredients and essential oils.',
      imageUrl: 'https://images.unsplash.com/photo-1607006472855-c42e6833636b?q=80&w=1974&auto=format&fit=crop',
    },
  })
  console.log(`   ✓ Created categories: "${oilsCategory.name}" and "${soapsCategory.name}"`)

  // 4. Seed products with nested variants and images
  console.log('   - Seeding products...')

  // Product 1: Lavender Dreams (with 3D model)
  await prisma.product.create({
    data: {
      name: 'Lavender Dreams',
      slug: 'lavender-dreams',
      sku: 'EO-LAV-01',
      description:
        'Our Lavender Dreams essential oil is sourced from the high-altitude fields of Provence, France, offering a serene and calming aroma. Perfect for diffusing before bedtime or adding to a warm bath to melt away stress.',
      shortDescription: 'Pure, calming lavender oil from Provence.',
      price: 29.99,
      isActive: true,
      isFeatured: true,
      modelUrl: '/models/bottle.glb', // Path to the 3D model
      category: { connect: { id: oilsCategory.id } },
      variants: {
        create: {
          sku: 'EO-LAV-01-15ML',
          name: '15ml Bottle',
          price: 29.99,
          inventoryQuantity: 100,
        },
      },
      images: {
        create: {
          url: 'https://images.unsplash.com/photo-1622683099321-2f3427494a9a?q=80&w=1974&auto=format&fit=crop',
          altText: 'A glass bottle of Lavender Dreams essential oil next to fresh lavender sprigs.',
          isPrimary: true,
        },
      },
    },
  })

  // Product 2: Citrus Burst
  await prisma.product.create({
    data: {
      name: 'Citrus Burst Oil',
      slug: 'citrus-burst-oil',
      sku: 'EO-CIT-02',
      description:
        'An uplifting blend of sweet orange, lemon, and grapefruit essential oils to energize your space and mood.',
      shortDescription: 'Energizing blend of citrus oils.',
      price: 24.99,
      isActive: true,
      isFeatured: true,
      category: { connect: { id: oilsCategory.id } },
      variants: {
        create: { sku: 'EO-CIT-02-15ML', name: '15ml Bottle', price: 24.99, inventoryQuantity: 80 },
      },
      images: {
        create: {
          url: 'https://images.unsplash.com/photo-1616019949433-6623351333b2?q=80&w=2080&auto=format&fit=crop',
          altText: 'A bottle of citrus oil surrounded by fresh citrus fruits.',
          isPrimary: true,
        },
      },
    },
  })

  // Product 3: Rose Petal Soap
  await prisma.product.create({
    data: {
      name: 'Rose Petal Soap',
      slug: 'rose-petal-soap',
      sku: 'SOAP-ROS-01',
      description:
        'A luxurious, handcrafted soap infused with real rose petals and nourishing shea butter for a gentle, moisturizing cleanse.',
      shortDescription: 'Hydrating soap with real rose petals.',
      price: 12.5,
      isActive: true,
      isFeatured: false,
      category: { connect: { id: soapsCategory.id } },
      variants: {
        create: { sku: 'SOAP-ROS-01-BAR', name: '120g Bar', price: 12.5, inventoryQuantity: 150 },
      },
      images: {
        create: {
          url: 'https://images.unsplash.com/photo-1607006472855-c42e6833636b?q=80&w=1974&auto=format&fit=crop',
          altText: 'A bar of pink soap with rose petals embedded in it.',
          isPrimary: true,
        },
      },
    },
  })
  
  // Product 4: Eucalyptus Clarity
  await prisma.product.create({
    data: {
      name: 'Eucalyptus Clarity',
      slug: 'eucalyptus-clarity',
      sku: 'EO-EUC-03',
      description: 'A sharp, camphoraceous aroma of pure Eucalyptus oil to promote clear breathing and a focused mind.',
      shortDescription: 'Refreshing and clarifying eucalyptus oil.',
      price: 19.99,
      isActive: true,
      isFeatured: false,
      category: { connect: { id: oilsCategory.id } },
      variants: {
        create: [{ sku: 'EO-EUC-03-15ML', name: '15ml Bottle', price: 19.99, inventoryQuantity: 120 }],
      },
      images: {
        create: [{ url: 'https://images.unsplash.com/photo-1629385012603-5374a2791475?q=80&w=1964&auto=format&fit=crop', altText: 'A bottle of eucalyptus oil with fresh eucalyptus leaves.', isPrimary: true }],
      },
    },
  })

  console.log(`   ✓ Seeded 4 products.`)
  console.log('✅ Seeding finished successfully.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
