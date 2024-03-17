'use client'

import Logo from "@/components/Logo"
import Button from "@/components/UI/Button"
import { useEffect, useState } from "react"
import { IoMdSend } from "react-icons/io"

export default function Home() {
  const [ invoices, setInvoices ] = useState<IInvoice[]>([])

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice/upload", {
      method: "POST",
      body: formData
    })

    const data = await response.json()

    fetchInvoices()
  }

  const fetchInvoices = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/invoice")
    const data = await response.json()
    setInvoices(data)
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

        <Button type="submit" Icon={IoMdSend}>Send Invoice</Button>
      </form>

      {invoices.length > 0 && (
        <section className="flex flex-col gap-4">
          <h3 className="text-2xl">Invoices</h3>

          <ul className="flex flex-col gap-4">
            {invoices.map(invoice => (
              <li key={invoice.id} className="flex gap-4">
                <span>{invoice.id}</span>
                <span>{invoice.fileName}</span>
                <span>{invoice.invoiceNumber}</span>
                <span>{invoice.invoiceDate?.toLocaleDateString()}</span>
                <span>{invoice.dueDate?.toLocaleDateString()}</span>
                <span>{invoice.balanceDue}</span>
                <span>{invoice.processedAt?.toLocaleDateString()}</span>
                <span>{invoice.createdAt?.toLocaleDateString()}</span>
                <span>{invoice.updatedAt?.toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
