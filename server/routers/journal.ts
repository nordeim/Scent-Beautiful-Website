// server/routers/journal.ts
import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { sanityClient } from '@/lib/cms/sanity'
import { TRPCError } from '@trpc/server'

const POST_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  "authorName": author->name,
  publishedAt,
  excerpt,
`

export const journalRouter = router({
  listPosts: publicProcedure.query(async () => {
    const query = `*[_type == "post"] | order(publishedAt desc) { ${POST_FIELDS} }`
    const posts = await sanityClient.fetch(query)
    return posts
  }),

  postBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const query = `*[_type == "post" && slug.current == $slug][0]{
        ${POST_FIELDS}
        body
      }`
      const post = await sanityClient.fetch(query, { slug: input.slug })

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with slug "${input.slug}" not found.`,
        })
      }
      return post
    }),
})
