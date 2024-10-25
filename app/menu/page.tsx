"use client"
import React, { useEffect, useState } from 'react'
import Button from '@/components/Button'
import { formatDate, formatDateCalendar } from '@/lib/utils'
import Image from 'next/image'
import { CroissantIcon, ImageIcon, TimerIcon, Trash2Icon } from 'lucide-react'

const MenuPage = () => {

    const [menus, setMenus] = useState<MenuType[]>([])

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this menu ?')
        if(!confirmDelete) return;

        try {
            for(let menu of menus) {
                const res = await fetch(`/api/menu/${menu.id}/delete`, {
                    method: 'DELETE'
                })
            }

            location.reload();
        } catch(error) {
            console.error("Error during deletion")
        }
    }

    useEffect(() => {
        const fetchMenus = async () => {
            const response = await fetch('/api/menu')
            const data : MenuType[] = await response.json()
            setMenus(data)
        }
        fetchMenus()
    }, [])

    return (
        <section className='mx-6'> 
            <h1 className='text-3xl'>Your Meal Plans</h1>
            <div className='flex flex-row flex-wrap gap-8 my-5'>
                {menus.map((menu: MenuType) => (
                    <div key={menu.id} className='relative flex flex-col gap-4 py-4 px-5 rounded-md bg-slate-800'>
                        <button className='absolute py-3 px-3 right-0 top-0 bg-slate-700 rounded-tr-md text-orange-600' onClick={handleDelete}>
                            <Trash2Icon />
                        </button>
                        <h3 className='text-2xl'>{formatDateCalendar(menu.date)}</h3>                                                    
                            {menu.menumeals.map((menumeal:MenuMealType)=> (
                                <div key={menumeal.meal.id}>
                                    <h4 className='flex flex-row text-xl my-2 gap-3 text-orange-600'><CroissantIcon/>{menumeal.meal.name}</h4>
                                    <ul className='flex flex-col gap-3'>
                                        {menumeal.meal.mealrecipes.length > 0 ? (
                                            menumeal.meal.mealrecipes.map((mealrecipe: MealRecipeType)=> (
                                                <li key={mealrecipe.id} className='flex flex-row justify-between items-center gap-32 bg-slate-700 py-2 px-3 rounded-md'>
                                                    <hgroup>
                                                        <h5>{mealrecipe.recipe.title}</h5>
                                                        <p className='flex flex-row gap-2 text-slate-400'><TimerIcon />{mealrecipe.recipe.duration} mins</p>
                                                    </hgroup>
                                                    {mealrecipe.recipe.image_url == "" ? (
                                                        <ImageIcon size={64}/>
                                                    ) : 
                                                    (
                                                    <Image className='rounded-lg w-[64px] h-[64px]' src={`/images/${mealrecipe.recipe.image_url}`} alt="Recipe Image" width="64" height="64"/>
                                                    )}
                                                </li>
                                            ))
                                        ) :
                                        (
                                            "No recipes registered for this meal"
                                        )}
                                        
                                    </ul>
                                </div>                               
                            ))}                                                  
                    </div>
                ))}
            </div>
        </section>
    )
}

export default MenuPage