"use client"
import RecipeCard from '@/components/RecipeCard'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Favorite = () => {

    const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeType[]>([])

    useEffect(() => {
        const fetchFavoriteRecipe = async () => {
            const response = await fetch('/api/private')
            const userData = await response.json()
            setFavoriteRecipes([userData.favoriteRecipes])
        }
        fetchFavoriteRecipe()
    }, [])

    return (
        <>
            <h1>Favorite List</h1>
            <ul>
            {favoriteRecipes.map((recipe: RecipeType) => (
                <Link href={`recipe/${recipe?.id}`} key={recipe?.id}>
                    <RecipeCard recipe={recipe} category={recipe?.category}/>
                </Link>
            ))}
            </ul>
        </>
    )
}

export default Favorite