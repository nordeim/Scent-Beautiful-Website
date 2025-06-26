// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed process...')

  console.log('   - Deleting existing data...')
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.user.deleteMany({})
  console.log('   ✓ Existing data cleared.')

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

  const oilsCategory = await prisma.category.create({
    data: {
      name: 'Essential Oils',
      slug: 'essential-oils',
      description: 'Pure, single-note and blended essential oils for aromatherapy.',
      imageUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468695/scent-assets/category-oils_p6kspc.jpg',
    },
  })
  const soapsCategory = await prisma.category.create({
    data: {
      name: 'Natural Soaps',
      slug: 'natural-soaps',
      description: 'Handcrafted soaps with natural ingredients and essential oils.',
      imageUrl: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468695/scent-assets/category-soaps_o9o6yq.jpg',
    },
  })
  console.log(`   ✓ Created categories: "${oilsCategory.name}" and "${soapsCategory.name}"`)

  console.log('   - Seeding products...')

  await prisma.product.create({
    data: {
      name: 'Lavender Dreams',
      slug: 'lavender-dreams',
      sku: 'EO-LAV-01',
      description: 'Our Lavender Dreams essential oil is sourced from the high-altitude fields of Provence, France...',
      shortDescription: 'Pure, calming lavender oil from Provence.',
      price: 29.99,
      isActive: true,
      isFeatured: true,
      modelUrl: '/models/bottle.glb',
      category: { connect: { id: oilsCategory.id } },
      variants: { create: { sku: 'EO-LAV-01-15ML', name: '15ml Bottle', price: 29.99, inventoryQuantity: 100 } },
      images: { create: { url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468694/scent-assets/product-lavender_vc4k5p.jpg', altText: 'A glass bottle of Lavender Dreams essential oil.', isPrimary: true } },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Citrus Burst Oil',
      slug: 'citrus-burst-oil',
      sku: 'EO-CIT-02',
      description: 'An uplifting blend of sweet orange, lemon, and grapefruit essential oils...',
      shortDescription: 'Energizing blend of citrus oils.',
      price: 24.99,
      isActive: true,
      isFeatured: true,
      category: { connect: { id: oilsCategory.id } },
      variants: { create: { sku: 'EO-CIT-02-15ML', name: '15ml Bottle', price: 24.99, inventoryQuantity: 80 } },
      images: { create: { url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468694/scent-assets/product-citrus_hxgjmu.jpg', altText: 'A bottle of citrus oil surrounded by fresh fruits.', isPrimary: true } },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Rose Petal Soap',
      slug: 'rose-petal-soap',
      sku: 'SOAP-ROS-01',
      description: 'A luxurious, handcrafted soap infused with real rose petals...',
      shortDescription: 'Hydrating soap with real rose petals.',
      price: 12.50,
      isActive: true,
      isFeatured: false,
      category: { connect: { id: soapsCategory.id } },
      variants: { create: { sku: 'SOAP-ROS-01-BAR', name: '120g Bar', price: 12.50, inventoryQuantity: 150 } },
      images: { create: { url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468695/scent-assets/product-rose-soap_n6e9w4.jpg', altText: 'A bar of pink soap with rose petals.', isPrimary: true } },
    },
  })

  await prisma.product.create({
    data: {
      name: 'Eucalyptus Clarity',
      slug: 'eucalyptus-clarity',
      sku: 'EO-EUC-03',
      description: 'A sharp, camphoraceous aroma of pure Eucalyptus oil to promote clear breathing...',
      shortDescription: 'Refreshing and clarifying eucalyptus oil.',
      price: 19.99,
      isActive: true,
      isFeatured: false,
      category: { connect: { id: oilsCategory.id } },
      variants: { create: { sku: 'EO-EUC-03-15ML', name: '15ml Bottle', price: 19.99, inventoryQuantity: 120 } },
      images: { create: { url: 'https://res.cloudinary.com/your-cloud-name/image/upload/v1719468695/scent-assets/product-eucalyptus_k38btr.jpg', altText: 'A bottle of eucalyptus oil with fresh leaves.', isPrimary: true } },
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
