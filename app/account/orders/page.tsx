// app/account/orders/page.tsx
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { OrderHistoryItem } from '@/components/features/account/OrderHistoryItem'

export const metadata = {
  title: 'Order History',
}

export default async function OrdersPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const orders = await caller.order.all()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderHistoryItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
