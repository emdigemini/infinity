import { useEffect, useState } from "react"
import type { AccountType, Props } from ".."
import { AuthContext } from "./AuthContext"
import baseUrl from "../axios";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";

const AuthProvider = ({ children }: Props) => {
  const [ isAppLoaded, setIsAppLoaded ] = useState(false);
  const [ user, setUser ] = useState<AccountType | null>(null);
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const loginAccount = async ({ username, password }: { username: string, password: string }) => {
    setIsLoading(true);
    try {
      const res = await baseUrl.post("/account/login-user", { username, password })
      setIsAuthenticated(true);
      setUser(res.data.user);
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        toast.error(err.response?.data?.message || 'Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (user) return;

    const checkAuth = async () => {
      try {
        const res = await baseUrl.get("/account/check-auth");
        if (!res.data) {
          setUser(null);
          setIsAuthenticated(false);
        }
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (err: unknown) {
        console.log(err)
      }
    }

    checkAuth();
  }, [user]);

  return (
    <AuthContext.Provider value={{
      isAppLoaded, setIsAppLoaded, user, isAuthenticated, isLoading,
      loginAccount
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
