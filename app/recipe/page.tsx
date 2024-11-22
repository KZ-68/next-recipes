"use client"
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import RecipeCard from '@/components/RecipeCard'
import Button from '@/components/Button'
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { EffectCoverflow, Pagination } from 'swiper/modules';

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
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {recipes.map((recipe: RecipeType) => (
                        <SwiperSlide className='w-72' key={recipe.id}>
                            <RecipeCard recipe={recipe} category={recipe.category}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            
        </>
    )
}

export default RecipePage
