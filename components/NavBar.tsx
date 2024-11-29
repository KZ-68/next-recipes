import Link from 'next/link'
import React from 'react'


const NavBar = () => {
  return (
    <nav className='flex flex-row justify-between gap-20 px-20 py-7 bg-slate-700 '>
      <h1 className='text-orange-500 font-bold text-2xl'>MyRecipes</h1>
      <div className='flex flex-row gap-6 text-white'>
        <Link className='hover:text-orange-500 text-lg' href='/recipe'>Recipes</Link>
        <Link className='hover:text-orange-500 text-lg' href='/meal-planner'>Meal Planner</Link>
        <Link className='hover:text-orange-500 text-lg' href='/article'>Blog</Link>
        <Link className='hover:text-orange-500 text-lg' href='/contact'>Contact</Link>
      </div>
    </nav>
  )
}

export default NavBar