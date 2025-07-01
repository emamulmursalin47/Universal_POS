/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // or your preferred toast library
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AtSign, Lock, ShoppingBag, Eye, EyeOff } from "lucide-react";
import { ROUTES } from "@/lib/constants";
import type { UserRole } from "@/lib/types";
import { useAppDispatch } from "@/redux/hook";
import { useLoginMutation } from "@/redux/api/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/slices/authSlice";
import { setTokenInCookies } from "@/Services/authServices";

// Define role routes mapping
const ROLE_ROUTES: Record<UserRole, string> = {
  superAdmin: ROUTES.SUPER_ADMIN.DASHBOARD,
  vendor: ROUTES.VENDOR_ADMIN.DASHBOARD,
  manager: ROUTES.CASHIER.POS,
  cashier: ROUTES.CASHIER.POS,
};

// Updated schema to handle email, userId, or contactNumber
const loginSchema = z.object({
  identifier: z.string().min(1, {
    message: "Please enter your email, user ID, or contact number",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigateToRoleDashboard = (role: UserRole) => {
    if (role in ROLE_ROUTES) {
      navigate(ROLE_ROUTES[role]);
    } else {
      navigate("/");
    }
  };

  // Helper function to determine the type of identifier
  const getIdentifierType = (identifier: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone number regex - only numbers, with optional + prefix
    const phoneRegex = /^\+?\d+$/;
    // UserId regex - must contain at least one letter and one number
    const userIdRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;

    if (emailRegex.test(identifier)) {
      return "email";
    } else if (phoneRegex.test(identifier)) {
      return "contactNumber";
    } else if (userIdRegex.test(identifier)) {
      return "userId";
    }

    // Default to contactNumber if it's all numbers but doesn't match phone regex
    if (/^\d+$/.test(identifier)) {
      return "contactNumber";
    }

    // If none of the above, treat as userId (you might want to throw error instead)
    return "userId";
  };

  const onSubmit = async (data: LoginFormValues) => {
    const identifierType = getIdentifierType(data.identifier);

    // Create the payload based on backend interface
    const userInfo: any = {
      password: data.password.trim(),
    };

    // Set the appropriate field based on identifier type
    switch (identifierType) {
      case "email":
        userInfo.email = data.identifier.trim();
        break;
      case "contactNumber":
        userInfo.contactNumber = data.identifier.trim();
        break;
      case "userId":
        userInfo.userId = data.identifier.trim();
        break;
    }

    console.log("userInfo", userInfo);

    try {
      const res = await login(userInfo).unwrap();

      console.log("Login response:", res);

      if (res?.statusCode === 200) {
        toast.success(res?.message || "Login successful");

        // Verify and decode the JWT token
        const user: any = verifyToken(res?.data?.accessToken);

        // Update Redux state
        dispatch(
          setUser({
            user,
            token: res?.data?.accessToken,
          })
        );

        // Set tokens in cookies
        setTokenInCookies(res?.data?.accessToken, res?.data?.refreshToken);

        // Navigate based on user role
        navigateToRoleDashboard(user?.role);
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.data?.message || "Login failed");
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
        <CardTitle className="text-2xl font-bold text-center">
          POS System Login
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / User ID / Contact Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter email, user ID, or contact number"
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
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10"
                        disabled={isLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent border-0 text-gray-400 hover:text-gray-600 focus:outline-none"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
