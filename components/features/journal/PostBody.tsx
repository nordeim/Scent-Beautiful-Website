// components/features/journal/PostBody.tsx
'use client'

import { PortableText, type PortableTextBlock } from '@portabletext/react'
import Image from 'next/image'
import { urlForImage } from '@/lib/cms/image'

const ptComponents = {
  types: {
    image: ({ value }: { value: PortableTextBlock & { asset?: any } }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative my-6 aspect-video">
          <Image
            src={urlForImage(value).fit('max').auto('format').url()}
            alt={value.alt || ' '}
            fill
            className="object-contain"
            loading="lazy"
          />
        </div>
      )
    },
  },
}

export function PostBody({ content }: { content: PortableTextBlock[] }) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <PortableText value={content} components={ptComponents} />
    </div>
  )
}
