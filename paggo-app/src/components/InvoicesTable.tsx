import React from 'react'

type Props = {
  invoices: IInvoice[]
  isLoading: boolean
}

const InvoicesTable: React.FC<any> = ({ invoices, isLoading }: Props) => {
  return isLoading ? (
    <div className="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">Invoice Number</th>
          <th scope="col" className="px-6 py-3">Invoice Date</th>
          <th scope="col" className="px-6 py-3">Due Date</th>
          <th scope="col" className="px-6 py-3">Balance Due</th>
          <th scope="col" className="px-6 py-3">Processed At</th>
          <th scope="col" className="px-6 py-3">Created At</th>
          <th scope="col" className="px-6 py-3">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={invoice.id}>
            <td className="px-6 py-4">{invoice.invoiceNumber}</td>
            <td className="px-6 py-4">{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4">{invoice.balanceDue}</td>
            <td className="px-6 py-4">{invoice.processedAt ? new Date(invoice.processedAt).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4">{invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4">{invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleDateString() : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InvoicesTable
