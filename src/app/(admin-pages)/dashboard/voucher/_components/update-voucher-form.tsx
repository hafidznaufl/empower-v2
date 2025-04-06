'use client'

import { useEffect, useState } from 'react'
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
import { formatCurrency } from '~/utils/currency'
import { voucherSchema } from './schemas'
import VoucherUpdateSkeleton from '~/app/_components/skeletons/voucher-update-form-skeleton'

type VoucherFormValues = z.infer<typeof voucherSchema>

interface UpdateVoucherFormProps {
  id: string
}

export default function UpdateVoucherForm({ id }: UpdateVoucherFormProps) {
  const router = useRouter()
  const utils = api.useUtils()

  const { data: voucherData, isLoading } = api.voucher.getById.useQuery({ id })

  const updateVoucher = api.voucher.update.useMutation({
    onSuccess: () => {
      toast.success('Voucher updated successfully!')
      router.push('/dashboard/voucher')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update voucher')
    },
  })

  const form = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      id,
      code: '',
      discount: 0,
      expiryDate: new Date(),
      isActive: true,
      minTransaction: 0,
      description: '',
      usageLimit: 1,
    },
  })

  const [localValue, setLocalValue] = useState(
    form.getValues('minTransaction')
      ? formatCurrency(form.getValues('minTransaction'))
      : '',
  )

  useEffect(() => {
    if (voucherData) {
      form.reset({
        id: voucherData.id,
        code: voucherData.code || '',
        discount: voucherData.discount || 0,
        expiryDate: voucherData.expiryDate
          ? new Date(voucherData.expiryDate)
          : new Date(),
        isActive: voucherData.isActive || false,
        minTransaction: voucherData.minTransaction || 0,
        description: voucherData.description || '',
        usageLimit: voucherData.usageLimit || 0,
      })
    }
  }, [voucherData, form])

  useEffect(() => {
    setLocalValue(
      form.getValues('minTransaction')
        ? formatCurrency(form.getValues('minTransaction'))
        : '',
    )
  }, [voucherData, form])

  const onSubmit = async (data: VoucherFormValues) => {
    try {
      await updateVoucher.mutateAsync({
        ...data,
        id,
        expiryDate: data.expiryDate.toISOString(),
      })
      await utils.voucher.getAll.invalidate()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unexpected error')
    }
  }

  if (isLoading) {
    return <VoucherUpdateSkeleton />
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
                  type="number"
                  placeholder="Enter usage limit"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number(e.target.value) || undefined)
                  }
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
            <FormItem>
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
          {form.formState.isSubmitting ? 'Updating...' : 'Update Voucher'}
        </Button>
      </form>
    </Form>
  )
}
