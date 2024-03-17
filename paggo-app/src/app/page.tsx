'use client'

import AuthHome from "@/components/AuthHome"
import Header from "@/components/Header";
import Home from "@/components/Home";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { InvoiceProvider } from "@/contexts/InvoiceContext";

export default function App() {

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 gap-20">
      <Header />

      <AuthProvider>
        <InvoiceProvider>
          <Home />
        </InvoiceProvider>
      </AuthProvider>
    </main>
  );
}
