'use client'

import React, { useEffect } from 'react'
import Button from './UI/Button'
import { IoMdSend } from 'react-icons/io'
import InvoicesTable from './InvoicesTable'
import { useInvoices } from '@/contexts/InvoiceContext'
import { io } from 'socket.io-client'
import { useAuth } from '@/contexts/AuthContext'

const socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");

const AuthHome: React.FC<any> = () => {
  const { invoices, isLoading, handleUpload, fetchInvoices } = useInvoices();
  const { user, logout } = useAuth();

  useEffect(() => {
    socket.on('invoiceChanged', (invoiceData) => {
      console.log('Invoice data:', invoiceData);
      fetchInvoices()
    });

    return () => {
      socket.off('invoiceChanged');
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchInvoices();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='flex flex-col gap-5 items-center'>
        <div className="flex justify-between items-center gap-5">
          <p>Hello, {user?.name}!</p>
        </div>

        <div>
          Do you want to leave?{" "}
          <button
            type="button"
            className="text-white hover:text-gray-300 font-bold"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

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

      <section className="flex flex-col gap-4">
        <h3 className="text-2xl text-center">Your Invoices</h3>

        {invoices.length > 0 ? (
          <InvoicesTable invoices={invoices} isLoading={isLoading} />
        ): (
          <p className="text-center">No invoices found</p>
        )}
      </section>
    </>
  )
}

export default AuthHome
