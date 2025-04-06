import ResetPasswordForm from './_components/reset-password.form'

export default function ResetPasswordPage() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-[350px]">
        <h1 className="mb-4 text-3xl font-bold">Reset Password</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Enter your email, and we will send you a password reset link.
        </p>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
