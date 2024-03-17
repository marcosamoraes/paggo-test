import React from 'react'
import { IconType } from 'react-icons'

type Props = {
  children: React.ReactNode
  Icon?: IconType
}

const Button: React.FC<any> = ({ children, Icon, ...props }) => {

  return (
    <button
      className={`flex ${Icon ? 'justify-between' : 'justify-center'} px-6 py-2 bg-white dark:bg-zinc-600 dark:border-zinc-400 dark:border dark:text-zinc-200 border-gray-600 border rounded-lg font-normal transform hover:-translate-y-0.5 transition duration-400 text-base`}
      {...props}
    >
      {children}
      {Icon && (
        <div className="my-auto">
          <Icon />
        </div>
      )}
    </button>
  )
}

export default Button
