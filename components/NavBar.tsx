import Link from 'next/link'
import React from 'react'


const NavBar:React.FC<any> = () => {
  return (
    <nav className='flex flex-row justify-between gap-3 px-4 py-7 bg-slate-900 text-white'>
      <h1>MyRecipes</h1>
      <div className='flex flex-row gap-3'>
        <Link href='/recipe'>Recipe</Link>
        <Link href='/article'>Blog</Link>
        <Link href='/contact'>Contact</Link>
      </div>
    </nav>
  )
}

export default NavBar