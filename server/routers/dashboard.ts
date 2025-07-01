// server/routers/dashboard.ts
import { router, protectedProcedure } from '../trpc'

// Helper function to serialize order data
const serializeOrder = (order: any) => ({
  ...order,
  total: order.total.toNumber(),
})

// Helper to serialize recommendation products
const serializeProduct = (product: any) => ({
  ...product,
  price: product.price.toNumber(),
})

export const dashboardRouter = router({
  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const { session, prisma } = ctx

    const [orderCount, recentOrders, recommendations] = await Promise.all([
      // 1. Get total order count
      prisma.order.count({
        where: { userId: session.user.id },
      }),
      // 2. Get the 5 most recent orders
      prisma.order.findMany({
        where: { userId: session.user.id },
        take: 5,
        orderBy: { createdAt: 'desc' },
      }),
      // 3. Get placeholder recommendations (e.g., featured products)
      prisma.product.findMany({
        where: { isFeatured: true, isActive: true },
        take: 2,
        include: {
          images: { where: { isPrimary: true }, take: 1 },
        },
      }),
    ])

    return {
      stats: {
        orderCount,
        // Placeholder for future logic
        quizResultsCount: 4, 
      },
      recentOrders: recentOrders.map(serializeOrder),
      recommendations: recommendations.map(serializeProduct),
    }
  }),
})
