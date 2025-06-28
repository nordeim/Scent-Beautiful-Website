// components/common/Skeletons.tsx
import { Card, CardContent, CardFooter, CardHeader } from '@/components/common/Card'
import { Button } from './Button'
import { AlertTriangle } from 'lucide-react'

/**
 * A skeleton component that mimics the layout of a ProductCard.
 * Used to provide a better loading state UI on the products page.
 */
export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative aspect-square bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-6 w-3/4 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
        <div className="mt-3 h-7 w-1/3 rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="h-10 w-full rounded-md bg-stone-200 dark:bg-stone-800 animate-pulse" />
      </CardFooter>
    </Card>
  )
}

/**
 * A generic error component to display when tRPC queries fail.
 */
export function GenericError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 text-destructive">
      <AlertTriangle className="h-12 w-12 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Something Went Wrong</h3>
      <p className="text-muted-foreground mb-6">We couldn't load the requested data. Please try again.</p>
      <Button onClick={onRetry} variant="destructive">
        Try Again
      </Button>
    </div>
  )
}
