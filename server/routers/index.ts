// server/routers/index.ts
import { productRouter } from './product'
import { cartRouter } from './cart'
import { orderRouter } from './order'
import { userRouter } from './user'
import { checkoutRouter } from './checkout'
import { journalRouter } from './journal' // New import
import { router } from '../trpc'

export const appRouter = router({
  product: productRouter,
  cart: cartRouter,
  order: orderRouter,
  user: userRouter,
  checkout: checkoutRouter,
  journal: journalRouter, // New router registered
})

export type AppRouter = typeof appRouter
