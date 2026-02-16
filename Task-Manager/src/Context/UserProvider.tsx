import { useEffect, useState, type ReactNode } from "react";
import { authService } from "../services/auth.service";
import { UserContext } from "./UserContext";
import type { User } from "../types/user.type";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const { isAuthenticated, user: authenticatedUser } =
          await authService.checkAuth();
        if (isAuthenticated && authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}