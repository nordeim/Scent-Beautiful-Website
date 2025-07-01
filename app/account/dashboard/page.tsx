// app/account/dashboard/page.tsx
import { createContext } from '@/server/context'
import { appRouter } from '@/server/routers'
import type { inferRouterOutputs } from '@trpc/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils/formatters'
import { BookOpen, Edit, ShoppingBag, ShoppingCart } from 'lucide-react'

export const metadata = {
  title: 'My Dashboard',
}

// Type definitions for our data
type DashboardData = inferRouterOutputs<AppRouter>['dashboard']['getDashboardData']
type RecentOrder = DashboardData['recentOrders'][0]
type Recommendation = DashboardData['recommendations'][0]

// --- Sub-Components for Dashboard Cards ---

function StatsCard({ stats }: { stats: DashboardData['stats'] }) {
  return (
    <Card className="md:col-span-2">
      <CardContent className="p-6 flex justify-around gap-4">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.orderCount}</p>
            <p className="text-sm text-muted-foreground">Recent Orders</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <BookOpen className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold">{stats.quizResultsCount}</p>
            <p className="text-sm text-muted-foreground">Quiz Results</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecentOrdersCard({ orders }: { orders: RecentOrder[] }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Recent Orders</CardTitle>
        <Button asChild variant="link" size="sm">
          <Link href="/account/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">#{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" className="capitalize mb-1">{order.status}</Badge>
                  <p className="font-semibold text-sm">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No recent orders found.</p>
        )}
      </CardContent>
    </Card>
  )
}

function ScentProfileCard({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your Scent Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          <h4 className="font-semibold text-sm">Latest Preferences:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
            <li>Mood: Relaxation</li>
          </ul>
        </div>
        <div className="space-y-2 border-t pt-4">
          <h4 className="font-semibold text-sm">Top Recommendations:</h4>
          {recommendations.length > 0 ? (
            <div className="space-y-3">
              {recommendations.map((rec) => (
                 <div key={rec.id} className="flex items-center gap-3">
                   <div className="relative h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                     <Image src={rec.images[0]?.url || ''} alt={rec.name} fill className="object-cover"/>
                   </div>
                   <div className="flex-grow">
                     <p className="text-sm font-medium leading-tight">{rec.name}</p>
                     <p className="text-xs text-muted-foreground">{formatPrice(rec.price)}</p>
                   </div>
                   <Button asChild size="sm" variant="ghost">
                     <Link href={`/products/${rec.slug}`}>View</Link>
                   </Button>
                 </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-2">No recommendations yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function QuickActionsCard() {
  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/account/profile" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <Edit className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Edit Profile</span>
        </Link>
        <Link href="/scent-finder" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <BookOpen className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Retake Quiz</span>
        </Link>
        <Link href="/products" className="flex flex-col items-center justify-center p-4 bg-stone-100 dark:bg-stone-900 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors text-center">
          <ShoppingCart className="h-8 w-8 text-primary mb-2"/>
          <span className="text-sm font-medium">Shop Now</span>
        </Link>
      </CardContent>
    </Card>
  )
}


export default async function DashboardPage() {
  const serverContext = await createContext()
  const caller = appRouter.createCaller(serverContext)
  const dashboardData = await caller.dashboard.getDashboardData()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Account Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard stats={dashboardData.stats} />
        <RecentOrdersCard orders={dashboardData.recentOrders} />
        <ScentProfileCard recommendations={dashboardData.recommendations} />
        <QuickActionsCard />
      </div>
    </div>
  )
}
