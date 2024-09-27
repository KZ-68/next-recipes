import Link from 'next/link'
import React from 'react'


const NavBar:React.FC<any> = () => {
  return (
    <nav className='flex flex-row justify-between gap-3 px-20 py-7 bg-slate-800 '>
      <h1 className='text-orange-500 text-xl'>MyRecipes</h1>
      <div className='flex flex-row gap-6 text-white'>
        <Link href='/recipe'>Recipes</Link>
        <Link href='/article'>Blog</Link>
        <Link href='/contact'>Contact</Link>
      </div>
    </nav>
  )
}

export default NavBar