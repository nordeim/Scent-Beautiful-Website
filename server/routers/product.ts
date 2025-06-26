// server/routers/product.ts
import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'

export const productRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(12),
        cursor: z.string().nullish(),
        category: z.string().optional(),
        sortBy: z.enum(['price', 'createdAt']).default('createdAt'),
        sortOrder: z.enum(['asc', 'desc']).default('desc'),
      }),
    )
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: input.limit + 1,
        where: {
          isActive: true,
          category: input.category ? { slug: input.category } : undefined,
        },
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          [input.sortBy]: input.sortOrder,
        },
        include: {
          variants: {
            orderBy: { price: 'asc' },
            take: 1,
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      })

      let nextCursor: typeof input.cursor | undefined = undefined
      if (products.length > input.limit) {
        const nextItem = products.pop()
        nextCursor = nextItem!.id
      }

      return {
        items: products,
        nextCursor,
      }
    }),

  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: { slug: input.slug, isActive: true },
        include: {
          variants: true,
          images: true,
          reviews: {
            include: {
              user: {
                select: {
                  firstName: true,
                  avatarUrl: true,
                },
              },
            },
          },
          category: true,
          brand: true,
        },
      })

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with slug "${input.slug}" not found.`,
        })
      }

      return product
    }),

  getRelated: publicProcedure
    .input(z.object({
      categoryId: z.string(),
      currentProductId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        take: 4,
        where: {
          isActive: true,
          categoryId: input.categoryId,
          id: {
            not: input.currentProductId, // Exclude the current product
          },
        },
        include: {
          variants: { orderBy: { price: 'asc' }, take: 1 },
          images: { where: { isPrimary: true }, take: 1 },
        },
      });
      return products;
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(3),
        slug: z.string().min(3),
        sku: z.string().min(3),
        description: z.string().optional(),
        price: z.number(),
        categoryId: z.string().uuid(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { role } = ctx.session.user
      if (role !== 'admin' && role !== 'staff') {
        throw new TRPCError({ code: 'FORBIDDEN' })
      }
      
      const product = await ctx.prisma.product.create({
        data: {
          name: input.name,
          slug: input.slug,
          sku: input.sku,
          description: input.description,
          price: input.price,
          categoryId: input.categoryId,
        },
      })
      return product
    }),
})
