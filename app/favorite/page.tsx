"use client"
import Category from '@/components/Category'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll'
import { ListIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Favorite = () => {

    const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([])

    useEffect(() => {
        const fetchFavoriteRecipe = async () => {
            const response = await fetch('/api/private/favorite')
            const userData = await response.json()
            setFavoriteRecipes(userData.favoriteRecipes)
        }
        fetchFavoriteRecipe()
    }, [])

    return (
        <>
            <ThemeSwitcherScroll/>
            <h1 id="favorites-list-header" className='text-orange-600 text-2xl font-bold flex flex-row gap-2 items-center'><ListIcon/>User Favorites List</h1>
            <div className='my-6 mx-8'>
                <ul className='flex flex-col justify-start gap-6 rounded-lg py-8 px-6 bg-slate-600'>
                    {favoriteRecipes ?
                        favoriteRecipes.map((recipe: RecipeType) => (
                            <Link href={`recipe/${recipe?.id}`} key={recipe?.id}>
                                <li key={recipe?.id}> 
                                    <p className='my-3 mx-4 text-xl'></p>
                                    <div className='flex flex-row gap-6 py-8 px-6 my-4 ml-8 mr-20 rounded-md bg-slate-800'>
                                        {recipe?.image_url == "" ? (
                                            <Image className='rounded-md h-[200px]' src={`https://placehold.co/200x200/png?text=placeholder&font=roboto`} alt="Recipe Image" width="200" height="200"/>
                                        ) : 
                                        (
                                            <Image className='rounded-md h-[200px]' src={`/images/${recipe?.image_url}`} alt="Recipe Image" width="200" height="200"/>
                                        )}
                                        <div className='flex flex-col'>
                                            <h2 className='text-xl text-white my-4'>{recipe.title}</h2>
                                            <Category text={recipe?.category?.name} key={recipe?.category?.id}/>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        ))
                    : 
                    (
                        <p className='rounded-md py-4 px-6 bg-slate-800'>Your favorites list is empty for now, add your favorite recipe</p>
                    )
                    }
                </ul>
            </div>
        </>
    )
}

export default Favorite