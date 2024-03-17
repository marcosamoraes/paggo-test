import React from 'react'

type Props = {
  invoices: IInvoice[]
  isLoading: boolean
}

const InvoicesTable: React.FC<any> = ({ invoices, isLoading }: Props) => {
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return isLoading ? (
    <div className="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  ) : (
    <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">ID</th>
          <th scope="col" className="px-6 py-3 text-center">Status</th>
          <th scope="col" className="px-6 py-3 text-center">Invoice Number</th>
          <th scope="col" className="px-6 py-3 text-center">Invoice Date</th>
          <th scope="col" className="px-6 py-3 text-center">Due Date</th>
          <th scope="col" className="px-6 py-3 text-center">Balance Due</th>
          <th scope="col" className="px-6 py-3 text-center">Processed At</th>
          <th scope="col" className="px-6 py-3 text-center">Created At</th>
          <th scope="col" className="px-6 py-3 text-center">Updated At</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map((invoice) => (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={invoice.id}>
            <td className="px-6 py-4">{invoice.id}</td>
            <td className="px-6 py-4 text-center">
              {invoice.processedAt ? (
                <p className='bg-green-500 text-green-700 dark:bg-green-400 dark:text-green-800 rounded-full px-2 py-1'>Processed</p>
              ) : (
                <p className='bg-yellow-500 text-yellow-700 dark:bg-yellow-400 dark:text-yellow-800 rounded-full px-2 py-1'>Pending</p>
              )}
            </td>
            <td className="px-6 py-4 text-center">{invoice.invoiceNumber ?? '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.balanceDue ? moneyFormatter.format(invoice.balanceDue) : '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.processedAt ? new Date(invoice.processedAt).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.createdAt ? new Date(invoice.createdAt).toLocaleDateString() : '-'}</td>
            <td className="px-6 py-4 text-center">{invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleDateString() : '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default InvoicesTable
