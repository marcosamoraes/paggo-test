import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

type InvoiceContextProps = {
  invoices: IInvoice[];
  isLoading: boolean;
  fetchInvoices: () => void;
  handleUpload: (e: React.FormEvent<HTMLFormElement>) => void;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const useInvoices = () => {
  const context = useContext(InvoiceContext);
  
  if (!context) {
    throw new Error('useInvoices must be used within a InvoiceProvider');
  }

  return context;
};

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [invoices, setInvoices] = useState<IInvoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice/upload", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      body: formData
    })

    const data = await response.json()

    fetchInvoices()
  }

  const fetchInvoices = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }
      
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      setInvoices(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <InvoiceContext.Provider value={{ invoices, isLoading, fetchInvoices, handleUpload }}>
      {children}
    </InvoiceContext.Provider>
  );
};