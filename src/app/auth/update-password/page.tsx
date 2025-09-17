import UpdatePasswordForm from './_components/update-password-form'

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-[350px]">
        <h1 className="mb-4 text-3xl font-bold">Update Password</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Please enter your new password to reset your account access.
        </p>
        <UpdatePasswordForm />
      </div>
    </div>
  )
}
