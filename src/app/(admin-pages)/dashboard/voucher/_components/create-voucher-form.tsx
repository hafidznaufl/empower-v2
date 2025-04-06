'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'
import { format } from 'date-fns'
import { CalendarIcon, HandCoins, Percent } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Calendar } from '~/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/utils/cn'
import { id as IDLocale } from 'date-fns/locale'
import { Switch } from '~/components/ui/switch'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { voucherSchema } from './schemas'
import { useState } from 'react'
import { formatCurrency } from '~/utils/currency'

type VoucherFormValues = z.infer<typeof voucherSchema>

export default function CreateVoucherForm() {
  const router = useRouter()
  const utils = api.useUtils()
  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      code: '',
      discount: 0,
      expiryDate: new Date(),
      isActive: true,
      minTransaction: 0,
      description: '',
      usageLimit: 0,
    },
  })

  const [localValue, setLocalValue] = useState(
    form.getValues('minTransaction')
      ? formatCurrency(form.getValues('minTransaction'))
      : '',
  )

  const createVoucher = api.voucher.create.useMutation({
    onSuccess: () => {
      toast.success('Voucher created successfully!')
      router.push('/dashboard/voucher')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to created voucher')
    },
  })

  const onSubmit = async (data: z.infer<typeof voucherSchema>) => {
    console.log('Submitted data:', data)
    try {
      await createVoucher.mutateAsync({
        ...data,
        expiryDate: data.expiryDate.toISOString(),
      })
      await utils.voucher.getAll.invalidate()
    } catch (error) {
      console.error('Failed to create voucher:', error)
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter voucher code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter voucher description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount (%)</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Enter discount"
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '')
                      field.onChange(value ? parseFloat(value) : 0)
                    }}
                  />
                  <Percent className="absolute right-4 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usageLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usage Limit</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Usage Limit"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    field.onChange(value ? parseFloat(value) : 0)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minTransaction"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Transaction</FormLabel>
              <FormControl className="relative">
                <div className="relative flex items-center">
                  <Input
                    type="text"
                    placeholder="Minimum amount Transaction"
                    value={localValue}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/\D/g, '')
                      const parsedValue = parseFloat(rawValue)
                      setLocalValue(rawValue ? formatCurrency(parsedValue) : '')
                      field.onChange(
                        Number.isNaN(parsedValue) ? 0 : parsedValue,
                      )
                    }}
                  />
                  <HandCoins className="absolute right-4 h-4 w-4 text-muted-foreground" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiry Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'EEEE, dd MMMM yyyy', {
                          locale: IDLocale,
                        })
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 text-muted-foreground" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field.value}
                    onSelect={(date) => field.onChange(date ?? new Date())}
                    fromYear={1970}
                    toYear={new Date().getFullYear()}
                    defaultMonth={new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3">
              <div className="space-y-1">
                <FormLabel>Active</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? 'Creating...' : 'Create Voucher'}
        </Button>
      </form>
    </Form>
  )
}
