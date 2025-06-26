// app/journal/[slug]/page.tsx
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { PostBody } from '@/components/features/journal/PostBody'

interface JournalPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: JournalPostPageProps) {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  try {
    const post = await caller.journal.postBySlug({ slug: params.slug })
    return { title: post.title, description: post.excerpt }
  } catch (error) {
    return { title: 'Post Not Found' }
  }
}

export default async function JournalPostPage({ params }: JournalPostPageProps) {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  
  try {
    const post = await caller.journal.postBySlug({ slug: params.slug })

    return (
      <article className="container my-12 max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold leading-tight">{post.title}</h1>
          <p className="text-muted-foreground mt-4">
            By {post.authorName} on{' '}
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>
        <div className="relative aspect-video w-full mb-8 rounded-lg overflow-hidden">
          <Image src={post.mainImage} alt={post.title} fill className="object-cover" />
        </div>
        <PostBody content={post.body} />
      </article>
    )
  } catch (error) {
    notFound()
  }
}
