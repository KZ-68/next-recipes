import Link from 'next/link'
import React from 'react'

interface ButtonProps {
  label: string;
  href: string;
}

const Button:React.FC<ButtonProps> = ({label, href}) => {
  return (
    <Link className='inline-block py-2 mt-2 mb-3 rounded-md bg-transparent hover:text-white text-md text-orange-500' href={href}>
      {label} 
    </Link>
  )
}

export default Button