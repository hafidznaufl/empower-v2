/* eslint-disable */
'use client'

import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { CalendarIcon, FileText, ImageIcon, Upload, X } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import { format } from 'date-fns'
import { Checkbox } from '~/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'
import { cn } from '~/utils/cn'
import { Calendar } from '~/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { Textarea } from '~/components/ui/textarea'
import { reportSchema } from './schema'
import { api } from '~/trpc/react'
import { useSupabaseUpload } from '~/utils/hooks/useSupabaseUpload'
import { useState } from 'react'
import Image from 'next/image'

export default function ReportIncidentForm() {
  const createReport = api.report.create.useMutation()
  const { uploadFile } = useSupabaseUpload()
  const router = useRouter()

  const [dragActive, setDragActive] = useState(false)

  const getFilePreview = (file: File) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file)
    }
    return null
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <ImageIcon className="h-6 w-6 text-blue-500" />
    }
    return <FileText className="h-6 w-6 text-amber-500" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes'
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
    else return (bytes / 1048576).toFixed(1) + ' MB'
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, field: any) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter(
        (file) =>
          file.type.startsWith('image/') || file.type === 'application/pdf',
      )

      if (validFiles.length > 0) {
        field.onChange([...(field.value ?? []), ...validFiles])
      }
    }
  }

  const removeFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    field: any,
  ) => {
    e?.preventDefault()
    e?.stopPropagation()

    const updatedFiles = [...field.value]
    updatedFiles.splice(index, 1)
    field.onChange(updatedFiles)
  }

  const form = useForm<z.infer<typeof reportSchema>>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: undefined,
      gender: undefined,
      studyProgram: undefined,
      semester: '',
      contact: '',
      willingToBeContacted: false,
      description: '',
      evidence: [],
    },
  })

  async function onSubmit(data: z.infer<typeof reportSchema>) {
    let uploadedEvidenceUrls: string[] = []

    if (Array.isArray(data.evidence) && data.evidence.length > 0) {
      const uploadResults = await Promise.all(
        data.evidence.map((file) => uploadFile(file, 'reports', 'evidence')),
      )

      if (uploadResults.includes(null)) {
        toast.error('Some evidence files failed to upload. Please try again.')
        return
      }

      uploadedEvidenceUrls = uploadResults.filter(Boolean) as string[]
    }

    try {
      await createReport.mutateAsync({
        name: data.name,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        studyProgram: data.studyProgram,
        semester: data.semester,
        contact: data.contact,
        willingToBeContacted: data.willingToBeContacted,
        description: data.description,
        evidence:
          uploadedEvidenceUrls.length > 0 ? uploadedEvidenceUrls : undefined,
      })

      toast.success('Report submitted successfully!', {
        description:
          'Thank you for your report. Our team will review it shortly.',
      })

      form.reset()
      router.push('/')
    } catch (error: any) {
      toast.error('Submission failed', {
        description:
          error?.message || 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <Card className="mx-4 mb-8 mt-16 rounded-xl md:my-8">
      <CardHeader>
        <CardTitle>Form Report Incident</CardTitle>
        <CardDescription>
          If you have experienced sexual harassment, please report it here. Your
          data is secure and confidential.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your fullname..."
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    Please provide your full legal name. If you&apos;re
                    reporting for someone else, enter their name instead.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email..."
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    This is the email address we can contact you at.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
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
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto bg-background p-0"
                      align="end"
                    >
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        fromYear={1970}
                        toYear={new Date().getFullYear()}
                        defaultMonth={new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    This is your date of birth, it helps us verify your
                    identity.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="MALE"
                            className="bg-background"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Male</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            value="FEMALE"
                            className="bg-background"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">Female</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Please select your gender for demographic purposes.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studyProgram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Study Program</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full bg-background">
                        <SelectValue placeholder="Select Program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="INFORMATICS_ENGINEERING">
                          Informatics Engineering
                        </SelectItem>
                        <SelectItem value="INFORMATION_SYSTEMS">
                          Information Systems
                        </SelectItem>
                        <SelectItem value="DIGITAL_BUSINESS">
                          Digital Business
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Choose your study program to help us categorize your report.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="semester"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Semester</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your semester..."
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    Specify which semester you are currently in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="08XXXXXXXXXX"
                      {...field}
                      className="bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a contact number where we can reach you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="willingToBeContacted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-background"
                    />
                  </FormControl>
                  <div className="space-y-3 leading-none">
                    <FormLabel>Willing to be contacted</FormLabel>
                    <FormDescription>
                      Check this box if you are open to being contacted for
                      follow-up.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description of Incident</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the incident..."
                      {...field}
                      className="resize-y bg-background"
                    />
                  </FormControl>
                  <FormDescription>
                    Provide details about the incident. Be as specific as
                    possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="evidence"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-semibold">
                    Evidence (File Upload)
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <div
                        className={`relative rounded-lg border-2 border-dashed bg-background p-6 transition-colors ${
                          dragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-muted-foreground/25 hover:border-primary/50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => handleDrop(e, field)}
                      >
                        <Input
                          id="file-upload"
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf"
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                          onChange={(e) => {
                            const files = e.target.files
                            if (!files) return

                            const currentFiles = field.value || []
                            const newFiles = Array.from(files)

                            if (currentFiles.length + newFiles.length > 10) {
                              toast.error(
                                'Sorry, you can only upload up to 10 files.',
                              )
                              return
                            }

                            field.onChange([...currentFiles, ...newFiles])
                          }}
                        />
                        <div className="flex flex-col items-center justify-center space-y-2 text-center">
                          <div className="rounded-full bg-primary/10 p-3">
                            <Upload className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="font-medium text-primary">
                              Click to upload or drag and drop
                            </span>
                            <span className="text-sm text-muted-foreground">
                              JPG, JPEG, PNG or PDF (max 10MB per file, up to 10
                              files)
                            </span>
                          </div>
                        </div>
                      </div>

                      {field.value && field.value.length > 0 && (
                        <div>
                          <CardContent className="p-0">
                            <h4 className="mb-3 font-medium">
                              Uploaded Files ({field.value.length})
                            </h4>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              {field.value.map((file: File, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between rounded-md border bg-background p-3"
                                >
                                  <div className="flex items-center space-x-3">
                                    {getFilePreview(file) ? (
                                      <div className="relative h-12 w-12 overflow-hidden rounded border">
                                        <Image
                                          src={
                                            getFilePreview(file) ??
                                            '/placeholder.svg'
                                          }
                                          alt={file.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : (
                                      <div className="flex h-12 w-12 items-center justify-center rounded border bg-muted">
                                        {getFileIcon(file)}
                                      </div>
                                    )}
                                    <div className="space-y-1">
                                      <p className="max-w-[180px] truncate text-sm font-medium sm:max-w-[280px]">
                                        {file.name}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {formatFileSize(file.size)}
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                    onClick={(e) => removeFile(e, index, field)}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Remove file</span>
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    If available, please upload any supporting evidence. Upload
                    any relevant files (.jpg, .jpeg, .png & .pdf).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 md:flex-row-reverse">
              <Button
                type="reset"
                variant={'destructive'}
                onClick={() => form.reset()}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? 'Creating...' : 'Create Report'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
