"use client"
import FavoritesList from '@/components/FavoritesList'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll'
import { ListIcon } from 'lucide-react'
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
                            <FavoritesList key={recipe.id} recipe={recipe}/>
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