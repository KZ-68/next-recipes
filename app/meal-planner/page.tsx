"use client"
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import { CalendarDays } from 'lucide-react';
import RecipeOption from '@/components/RecipeOption';
import ReactDOM from "react-dom";
import Modal from '@/components/Modal';
import Button from '@/components/Button';
import Link from 'next/link';
import { formatDateCalendar } from '@/lib/utils';

const MealPlannerPage = () => {

    const [recipes, setRecipes] = useState<RecipeType[]>([])
    const [meals, setMeals] = useState<MealType[]>([])
    const [mealrecipes, setMealRecipes] = useState<MealRecipeType[]>([])
    const [showModal, setShowModal] = useState(false);

    const dateMealPlanner = dateHandler;

    function dateHandler(e){
        const date = formatDateCalendar(e.target.value);
        return date;
    }

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
                <input onChange={dateHandler} className='py-1 bg-white text-black' type="date" id="start" name="trip-start" max="2099-12-31" />
                <CalendarDays className='text-black' />
                </div>
                <div className='flex flex-row my-9 gap-8'>
                    {
                        meals.map((meal:MealType) => (
                        <div key={meal.id} className='flex flex-col gap-5 bg-slate-700 rounded-md w-96 py-3 px-4'>
                            <div className='flex flex-row justify-between gap-16'>
                                <div className='flex flex-col'>
                                    <h2 className='my-2'>{meal.name}</h2>
                                </div>
                                <button onClick={() => setShowModal(true)} className='bg-blue-400 px-3 rounded-lg w-fit'>+</button>
                            </div>
                            <ul className='flex flex-col py-3 px-4 rounded-md bg-slate-700'>
                            {mealrecipes.length > 0 ? (
                                mealrecipes.map((mealrecipe:MealRecipeType) => (
                                    <li key={mealrecipe.id}>{mealrecipe.recipe.title}</li>
                                ))
                            ):(
                                <li>No recipes added yet</li>
                            )}
                            </ul>
                        </div>
                        ))
                    }
                    <div id='modal-root'>
                        {showModal === true ? (
                            <Modal onClose={() => setShowModal(false)}>
                                <RecipeOption recipes={recipes} title='Select Recipes' />
                            </Modal>
                        ) :
                        (
                            ''
                        )}
                    </div>
                    
                </div>
                <button className='py-2 px-5 bg-green-700 text-white rounded-md' type='submit'>Validate Meal Plan</button>
            </form>
        </section>
    )
}
export default MealPlannerPage