// components/features/auth/AuthTabs.tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

// A new, dedicated set of Tab components specifically for the Auth forms.
// This decouples its specific styling from the generic Tabs component.

const AuthTabs = TabsPrimitive.Root

const AuthTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'grid w-full grid-cols-2 items-center justify-center rounded-lg border p-1',
      className,
    )}
    {...props}
  />
))
AuthTabsList.displayName = TabsPrimitive.List.displayName

const AuthTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md',
      className,
    )}
    {...props}
  />
))
AuthTabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const AuthTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
))
AuthTabsContent.displayName = TabsPrimitive.Content.displayName

export { AuthTabs, AuthTabsList, AuthTabsTrigger, AuthTabsContent }
