// components/features/account/OrderHistoryItem.tsx
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'
import { formatPrice } from '@/lib/utils/formatters'
import { Badge } from '@/components/common/Badge' // We will create this component

type Order = inferRouterOutputs<AppRouter>['order']['all'][number]

interface OrderHistoryItemProps {
  order: Order
}

export function OrderHistoryItem({ order }: OrderHistoryItemProps) {
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="border rounded-lg p-4 transition-colors hover:bg-stone-100/50 dark:hover:bg-stone-900/50">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-semibold">Order #{order.orderNumber}</p>
          <p className="text-sm text-muted-foreground">Date: {orderDate}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold">{formatPrice(order.total)}</p>
          <Badge
            variant={order.status === 'delivered' ? 'default' : 'secondary'}
            className="mt-1 capitalize"
          >
            {order.status}
          </Badge>
        </div>
      </div>
    </div>
  )
}
