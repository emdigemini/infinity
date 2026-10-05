import { createContext, useContext } from "react";
import type { AccountType } from "..";

interface AuthContextType {
  isAppLoaded: boolean;
  setIsAppLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  user: AccountType | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAccount: ({ username, password }: { username: string, password: string }) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
