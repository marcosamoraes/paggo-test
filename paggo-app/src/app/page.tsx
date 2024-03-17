'use client'

import InvoicesTable from "@/components/InvoicesTable"
import Logo from "@/components/Logo"
import Button from "@/components/UI/Button"
import { useEffect, useState } from "react"
import { IoMdSend } from "react-icons/io"

export default function Home() {
  const [ invoices, setInvoices ] = useState<IInvoice[]>([])
  const [ isLoading, setIsLoading ] = useState<boolean>(true)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice/upload", {
      method: "POST",
      body: formData
    })

    const data = await response.json()

    fetchInvoices()
  }

  const fetchInvoices = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice")
      const data = await response.json()
      setInvoices(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchInvoices()
  }, [])

  return (
    <main className="flex min-h-screen flex-col justify-center items-center p-24 gap-20">
      <header className="flex flex-col items-center gap-6">
        <Logo />
        <h2 className="text-2xl">Upload your invoice and we&apos;ll do the rest.</h2> 
      </header>

      <form className="flex flex-col gap-4" encType="multipart/form-data" method="post" onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          className="p-2 border border-gray-300 rounded-lg"
          name="file"
        />

        <Button type="submit" Icon={IoMdSend} disabled={isLoading}>
          {isLoading ? "Uploading..." : "Send Invoice"}
        </Button>
      </form>

      {invoices.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl text-center">Invoices</h3>

          <InvoicesTable invoices={invoices} isLoading={isLoading} />
        </section>
      )}
    </main>
  );
}
