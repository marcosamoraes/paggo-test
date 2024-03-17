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

          <table className="w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>File</th>
                <th>Invoice Number</th>
                <th>Invoice Date</th>
                <th>Due Date</th>
                <th>Balance Due</th>
                <th>Processed At</th>
                <th>Created At</th>
                <th>Updated At</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map(invoice => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.fileName}</td>
                  <td>{invoice.invoiceNumber}</td>
                  <td>{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '-'}</td>
                  <td>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}</td>
                  <td>{invoice.balanceDue}</td>
                  <td>{invoice.processedAt ? new Date(invoice.processedAt).toLocaleDateString() : '-'}</td>
                  <td>{invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-'}</td>
                  <td>{invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleDateString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  );
}
