"use client"
import RecipeCard from '@/components/RecipeCard'
import { Link } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const Favorite = () => {

    const [favoriteRecipe, setFavoriteRecipe] = useState<RecipeType[]>([])

    useEffect(() => {
        const fetchFavoriteRecipe = async () => {
            const response = await fetch('/api/private')
            const data : RecipeType[] = await response.json()
            setFavoriteRecipe(data)
        }
        fetchFavoriteRecipe()
    }, [])

    return (
        <>
            <h1>Favorite List</h1>
            <ul>
            {favoriteRecipe.map((recipe: RecipeType) => (
                <Link href={`recipe/${recipe.id}`} key={recipe.id}>
                    <RecipeCard recipe={recipe} category={recipe.category}/>
                </Link>
            ))}
            </ul>
        </>
    )
}

export default Favorite