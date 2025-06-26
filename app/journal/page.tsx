// app/journal/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { Card, CardContent, CardHeader } from '@/components/common/Card'

export const metadata = {
  title: 'The Journal',
  description: 'Explore insights, stories, and guides on aromatherapy and holistic wellness.',
}

export default async function JournalPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const posts = await caller.journal.listPosts()

  return (
    <div className="container my-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">The Journal</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, stories, and guides on aromatherapy and holistic wellness.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link href={`/journal/${post.slug}`} key={post._id} className="group">
            <Card className="h-full overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative aspect-video">
                  <Image
                    src={post.mainImage || '/placeholder.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-foreground/80">{post.excerpt}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
