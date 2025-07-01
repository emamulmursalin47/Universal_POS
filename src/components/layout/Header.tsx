import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hook";
import userIcon from "@/assets/dp.jpg";
interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b h-16 flex items-center justify-between px-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <Button variant="default" size="icon" onClick={toggleTheme}>
          {theme === "light" ? (
            <div className="">
              <Moon className="h-5 w-5" />
            </div>
          ) : (
            <div className="">
              <Sun className="h-5 w-5 text-black" />
            </div>
          )}
        </Button>
        {/* <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
              3
            </Badge>
          </Button>
        </div> */}
        {user && (
          <div className="flex items-center space-x-2">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user.role.replace("_", " ")}
              </p>
            </div>
            <Avatar>
              <AvatarImage src={userIcon} alt={user?.name} />
              <AvatarFallback>
                {getInitials(user?.name || ("User" as string))}
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
  );
}
