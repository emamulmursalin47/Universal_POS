import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AtSign, Lock, ShoppingBag } from 'lucide-react';
import type { UserRole } from '@/lib/types';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/lib/constants';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '@/lib/types';

const loginSchema = z.object({
  email: z.union([
    z.string().email({ message: 'Please enter a valid email address' }),
    z.string().min(3, { message: 'Username must be at least 3 characters' })
  ]),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;



export function LoginForm() {
  // const { login, error, isLoading } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const redirectBasedOnRole = (role: UserRole) => {
    console.log(role);
    // console.log(user);
    // if (!user) return;

    switch (role) {
      case 'superAdmin':
        console.log('redirecting to super admin dashboard');
        navigate(ROUTES.SUPER_ADMIN.DASHBOARD);
        break;
      case 'vendor':
        navigate(ROUTES.VENDOR_ADMIN.DASHBOARD);
        break;
      case 'manager':
        navigate(ROUTES.CASHIER.POS);
        break;
      default:
        navigate(ROUTES.LOGIN);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    setServerError(null);

    try {
      const response = await axios.post('/api/v1/auth/login', { userId:email, password });
      const { accessToken } = response.data.data;

      if (!accessToken) {
        setServerError('No access token received from server');
        setIsLoading(false);
        return false;
      }

      localStorage.setItem('accessToken', accessToken);
      const decoded: DecodedToken = jwtDecode(accessToken);
      console.log(decoded.role);
      redirectBasedOnRole(decoded.role);

      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);

      if (axios.isAxiosError(error)) {
        // Handle different HTTP status codes
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || error.response.data?.error;

          switch (status) {
            case 400:
              setServerError(message || 'Invalid request. Please check your input.');
              break;
            case 401:
              setServerError(message || 'Invalid email or password.');
              break;
            case 403:
              setServerError(message || 'Access forbidden.');
              break;
            case 404:
              setServerError('Login service not found.');
              break;
            case 500:
              setServerError('Server error. Please try again later.');
              break;
            default:
              setServerError(message || `Server error (${status}). Please try again.`);
          }
        } else if (error.request) {
          // Network error - no response received
          setServerError('Network error. Please check your connection and try again.');
        } else {
          // Request setup error
          setServerError('Request failed. Please try again.');
        }
      } else {
        // Non-Axios error (e.g., JWT decode error)
        setError('An unexpected error occurred. Please try again.');
      }

      return false;
    }
  };

  const onSubmit = async (data: LoginFormValues) => {
    setServerError(null);
    const success = await login(data.email, data.password);
    if (!success) {
      setServerError('Invalid email or password. Try using sample credentials.');
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-primary p-2 rounded-full">
            <ShoppingBag className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">POS System Login</CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="email@example.com"
                        className="pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        disabled={isLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {(serverError || error) && (
              <div className="text-sm font-medium text-destructive">
                {serverError || error}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-muted-foreground text-center">
          <p>Sample Credentials (for demo purposes)</p>
          <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
            <div className="bg-muted p-2 rounded">
              <p className="font-semibold">Super Admin</p>
              <p>admin@example.com</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="font-semibold">Vendor</p>
              <p>vendor@example.com</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="font-semibold">Cashier</p>
              <p>cashier@example.com</p>
            </div>
            <div className="bg-muted p-2 rounded">
              <p className="font-semibold">Password</p>
              <p>password</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}