import Image from 'next/image'
import React from 'react'

const Logo: React.FC<any> = () => {
  return (
    <div>
      <Image src="/logo.svg" alt="Paggo Logo" width={200} height={200} />
      <h2 className="text-right">Invoice App</h2>
    </div>
  )
}

export default Logo
