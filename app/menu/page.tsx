"use client"
import React, { useEffect, useState } from 'react'
import { formatDateCalendar } from '@/lib/utils'
import Image from 'next/image'
import { CroissantIcon, EggFriedIcon, HamIcon, ImageIcon, TimerIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll'
import Button from '@/components/Button'

const MenuPage = () => {

    const [menus, setMenus] = useState<MenuType[]>([])

    const handleDelete = async (menuId:string) => {
        console.log(menuId)
        const confirmDelete = window.confirm('Are you sure you want to delete this menu ?')
        if(!confirmDelete) return;

        try {
            for(const menu of menus) {
                if(menu.id == menuId) {
                    await fetch(`/api/menu/${menu.id}/delete`, {
                        method: 'DELETE'
                    })
                }
            }

            location.reload();
        } catch(error) {
            console.error("Error during deletion : "+error)
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
            <ThemeSwitcherScroll/>
            <h1 className='text-3xl'>Your Meal Plans</h1>
            <div className='flex flex-row flex-wrap gap-8 my-5'>
                {menus.length > 0 ? 
                (
                    menus.map((menu: MenuType) => (
                        <div key={menu.id} className='relative flex flex-col gap-4 py-4 px-5 rounded-md bg-slate-800'>
                            <button className='absolute py-3 px-3 right-0 top-0 bg-slate-700 rounded-tr-md text-orange-600' onClick={() => handleDelete(menu.id)}>
                                <Trash2Icon />
                            </button>
                            <h3 className='text-2xl text-white'>{formatDateCalendar(menu.date)}</h3>                                                    
                                {menu.meals.map((meal:MealType)=> (
                                    <div key={meal.id}>
                                        {meal.name == 'Dinner' ? 
                                            (
                                            <h4 className='flex flex-row text-xl my-2 gap-3 text-orange-600'>
                                                <EggFriedIcon/>{meal.name}
                                            </h4>
                                            ):meal.name == 'Breakfast' ? 
                                            (
                                            <h4 className='flex flex-row text-xl my-2 gap-3 text-orange-600'>
                                                <CroissantIcon/>{meal.name}
                                            </h4>
                                            ):meal.name == 'Lunch' ?
                                            (
                                            <h4 className='flex flex-row text-xl my-2 gap-3 text-orange-600'>
                                                <HamIcon/>{meal.name}
                                            </h4> 
                                            ):
                                            (
                                                <h4 className='flex flex-row text-xl my-2 gap-3 text-orange-600'>
                                                    {meal.name}
                                                </h4>
                                            )
                                        }
                                        <ul className='flex flex-col gap-3'>
                                            {meal.mealrecipes.length > 0 ? (
                                                meal.mealrecipes.map((mealrecipe: MealRecipeType)=> (
                                                    <li key={mealrecipe.recipe?.id} className='flex flex-row justify-between items-center gap-32 bg-slate-700 py-2 px-3 rounded-md'>
                                                        <hgroup>
                                                            <h5 className='text-white'>{mealrecipe.recipe?.title}</h5>
                                                            <p className='flex flex-row gap-2 text-slate-400'><TimerIcon />{mealrecipe.recipe?.duration} mins</p>
                                                        </hgroup>
                                                        {mealrecipe.recipe?.image_url == "" ? (
                                                            <ImageIcon size={64}/>
                                                        ) : 
                                                        (
                                                        <Image className='rounded-lg w-[64px] h-[64px]' src={`/images/${mealrecipe.recipe?.image_url}`} alt="Recipe Image" width="64" height="64"/>
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
                    ))
                ):
                (
                    <p className='text-black dark:text-white'>Menus list is empty for now, please add new menu plans on <span><Link className='text-orange-600' href="/meal-planner">this link</Link></span></p>
                )}
            </div>
        </section>
    )
}

export default MenuPage