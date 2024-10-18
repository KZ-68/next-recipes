"use client"
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react';
import RecipeOption from '@/components/RecipeOption';
import ReactDOM from "react-dom";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Link from 'next/link';

const MealPlannerPage = () => {

    const [recipes, setRecipes] = useState<RecipeType[]>([])
    const [meals, setMeals] = useState<MealType[]>([])
    const [mealrecipes, setMealRecipes] = useState<MealRecipeType[]>([])
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const multiFetch = async () => {
            const response = await fetch('/api/recipe')
            const data : RecipeType[] = await response.json()
            const responseMeals = await fetch('/api/meal')
            const dataMeals : MealType[] = await responseMeals.json()
            setRecipes(data)
            setMeals(dataMeals)
        }
        multiFetch()
    }, [])

    return (
        <section className='mx-8'>
            <h1 className='text-3xl my-6'>Meal Planer</h1>
            <Link className='bg-red-500 py-3 px-4 rounded-xl' href='/menu' >
                My Meal Plans
            </Link>
            <form className='my-6' action="">
                <label>Select Date :</label>
                <div className='flex flex-row items-center bg-white w-fit rounded-md py-1 px-1 my-1'>
                <input className='py-1 bg-white text-black' type="date" id="start" name="trip-start" max="2099-12-31" />
                <CalendarDays className='text-black' />
                </div>
                <div className='flex flex-row my-9 gap-3'>
                    {
                        meals.map((meal:MealType) => (
                        <div className='flex flex-row gap-5 bg-slate-700 rounded-md w-fit py-3 px-4'>
                            <div className='flex flex-col'>
                                <h2 className='my-2'>{meal.name}</h2>
                            </div>
                            <button onClick={() => setShowModal(true)} className='bg-blue-400 p-2 rounded-lg'>+</button>
                            <ul>
                            {meal.mealrecipes.length > 0 ? (
                                <li></li>
                            ):(
                                <p>No recipes added yet</p>
                            )}
                            </ul>
                        </div>
                        ))
                    }
                    {showModal &&
                        <Modal onClose={() => setShowModal(false)}>
                            <RecipeOption recipes={recipes} title='Select Recipes' />
                        </Modal>
                    }
                    
                </div>
            </form>
        </section>
    )
}
export default MealPlannerPage