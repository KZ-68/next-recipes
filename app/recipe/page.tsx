"use client"
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'
import Button from '@/components/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';

const RecipePage = () => {

    const [recipes, setRecipes] = useState<RecipeType[]>([])

    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch('/api/recipe')
            const data : RecipeType[] = await response.json()
            setRecipes(data)
        }
        fetchRecipes()
    }, [])

    return (
        <>
            <Button href='https://elan-formation.fr/accueil' label='Retour'/>
            <h1 className='text-4xl font-bold mt-4 mb-6'>Recipes</h1>
            <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
                {recipes.map((recipe: RecipeType) => (
                    <SwiperSlide key={recipe.id}>
                        <RecipeCard recipe={recipe}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default RecipePage
