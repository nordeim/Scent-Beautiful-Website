// components/features/account/ManageAddresses.tsx
'use client'

import { api } from '@/lib/api/trpc'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Edit, Plus, Trash2 } from 'lucide-react'
import { AddressFormDialog } from './AddressFormDialog'
import { Badge } from '@/components/common/Badge'

export function ManageAddresses() {
  const utils = api.useUtils()
  const { data: addresses, isLoading } = api.address.list.useQuery()

  const deleteAddress = api.address.delete.useMutation({
    onSuccess: () => {
      utils.address.list.invalidate()
    },
  })

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      deleteAddress.mutate({ id })
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Shipping Addresses</CardTitle>
          <CardDescription>Manage your saved addresses.</CardDescription>
        </div>
        <AddressFormDialog
          trigger={
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
          }
        />
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground text-center py-4">Loading addresses...</p>}
        <div className="space-y-4">
          {addresses?.map((address) => (
            <div key={address.id} className="p-4 border rounded-md flex justify-between items-start gap-4">
              <div className="flex-grow">
                <p className="font-semibold">{address.firstName} {address.lastName}</p>
                <p className="text-sm text-muted-foreground">{address.addressLine1}</p>
                {/* Conditionally render Address Line 2 */}
                {address.addressLine2 && <p className="text-sm text-muted-foreground">{address.addressLine2}</p>}
                {/* Display city, state, postal code, and country */}
                <p className="text-sm text-muted-foreground">
                  {address.city}, {address.stateProvince} {address.postalCode}, {address.countryCode}
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                {address.isDefault && <Badge variant="secondary">Default</Badge>}
                <div className="flex gap-1">
                  <AddressFormDialog
                    initialData={address}
                    trigger={
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDelete(address.id)}
                    disabled={deleteAddress.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {addresses?.length === 0 && !isLoading && (
            <p className="text-sm text-muted-foreground text-center py-4">You have no saved addresses.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
