import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextProps {
  user: IUser | null;
  authIsLoading: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  errors: string[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ user, setUser ] = useState<IUser | null>(null);
  const [ authIsLoading, setAuthIsLoading ] = useState<boolean>(false);
  const [ token, setToken ] = useState<string | null>(null);
  const [ errors, setErrors ] = useState<string[]>([]);
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  }
    
  const getUser = async () => {
    setAuthIsLoading(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setUser(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAuthIsLoading(false);
    }
  }

  const login = async (email: string, password: string) => {
    setAuthIsLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json();

      if (!data.access_token) {
        throw new Error("No access token found");
      }
      
      storeToken(data.access_token);
    } catch (error) {
      console.error(error);
    } finally {
      setAuthIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setAuthIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })

      if (response.status !== 201) {
        const data = await response.json();

        if (data?.error) {
          setErrors(data.message ?? [data.error]);
          return;
        }
      }

      await login(email, password);
    } catch (error: any) {
      console.log(error)
      // throw new Error(error.message ?? "An error occurred");
    } finally {
      setAuthIsLoading(false);
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authIsLoading, login, register, logout, errors }}>
      {children}
    </AuthContext.Provider>
  );
};