import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex w-full items-center justify-center bg-gradient-to-br from-muted/50 to-background p-4">
      <LoginForm />
    </div>
  );
}