"use client"
// import { db } from '@/lib/db'
import React, { useEffect, useState } from 'react'
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CalendarDays } from 'lucide-react';
import Link from 'next/link';
import { formatDateCalendar } from '@/lib/utils';
import DraggableItem from '@/components/DraggableItem';

const MealPlannerPage = () => {
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [recipes, setRecipes] = useState<RecipeType[]>([])
    const [meals, setMeals] = useState<MealType[]>([])
    const [meal, setMeal] = useState<MealType | null>(null)
    const [modalRecipes, setModalRecipes] = useState<RecipeType[]>([])
    const [menu, setMenu] = useState<MenuType | null>(null)
    const [date, setDate] = useState<string>("");
    const [selectedRecipes, setSelectedRecipes] = useState<RecipeType[]>([])

    function handleModalClick(e) {
        let recipesData : RecipeType[] = [];
        setModalRecipes(recipesData);
        selectedRecipes.forEach(selectedRecipe => {
            recipes.forEach(recipe => {
                if(recipe.id === selectedRecipe) {
                    modalRecipes.push(recipe)
                }
            })
        });
        menu.date = date;
        menu?.meals.push(meal);
        modalRecipes.forEach(recipe => {
            meal.recipes.push(recipe);
        })
    
        return onClose()
    }

    async function handleValidateClick(e) {
        const response = await fetch(`/api/menu/new`, {
            method: 'POST',
            body: JSON.stringify(menu),
        })
    }

    function onPress(mealData) {
        setMeal(mealData);
        onOpen();
    }

    function dateHandler(e){
        const dateTarget = new Date(e.target.value).toISOString();
        console.log(dateTarget);
        setDate(dateTarget);
    }

    function getSelectedOptions(e) {
        const options = e.target.options;
        const selectedOptions = [];
        const selectedValues = [];

        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
            selectedOptions.push(options[i]);
            selectedValues.push(options[i].value);
            }
        }
        setSelectedRecipes(selectedValues);
    }

    useEffect(() => {
        const multiFetch = async () => {
            const response = await fetch('/api/recipe')
            const data : RecipeType[] = await response.json()
            const mealDinner : MealType = {name:'Dinner'}
            const mealLunch : MealType = {name:'Lunch'}
            const mealBreakfast : MealType = {name:'Breakfast'}
            const dataMeals : MealType[] = [mealDinner, mealLunch, mealBreakfast]
            dataMeals.forEach(dataMeal => {
                dataMeal.recipes = [];
            })
            setRecipes(data)
            setMeals(dataMeals)
            const dataMenu : MenuType = {meals:[]};
            setMenu(dataMenu);
        }
        
        multiFetch()
    }, [])

    return (
        <section className='relative flex flex-col items-start gap-8 mx-8'>
            <h1 className='text-3xl my-6'>Meal Planer</h1>
            <Link className='bg-red-500 py-3 px-4 rounded-xl' href='/menu' >
                My Meal Plans
            </Link>
            
            <label>Select Date :</label>
            <div className='flex flex-row items-center bg-white w-fit rounded-md py-1 px-1 my-1'>
                <input onChange={dateHandler} className='py-1 bg-white text-black' type="date" id="start" name="trip-start" max="2099-12-31" />
                <CalendarDays className='text-black' />
            </div>
            <div className='relative right-[600px]' id='modal-root'>
                <Modal className='absolute left-80 bottom-72 w-fit' isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                    <ModalContent className='flex flex-col bg-slate-800 rounded-md py-3 px-5'>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div>
                                    <h1 className='text-2xl my-4'>Select Recipes</h1>
                                    <select className='p-2' autoFocus={true} multiple size={recipes.length} onChange={getSelectedOptions}>
                                        {recipes.map((recipe:RecipeType) => (
                                            <option className='mx-3 my-2 py-4 pl-3 pr-72 text-lg rounded-md' key={recipe.id} value={recipe.id}>{recipe.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </ModalBody>
                            <ModalFooter className='flex flex-row justify-end gap-3'>
                                <Button className='my-4 py-3 px-5 text-lg rounded-md bg-slate-700' color="danger" variant="light" onPress={onClose}>
                                Cancel
                                </Button>
                                <Button className='my-4 py-3 px-5 text-lg rounded-md bg-blue-700' color="primary" onPress={handleModalClick}>
                                Add Selected
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
            <div className='flex flex-row my-9 gap-8'>
                {
                    meals.map((meal:MealType) => (
                    <div key={meal.id} className='flex flex-col gap-5 bg-slate-700 rounded-md w-96 py-3 px-4'>
                        <div className='flex flex-row justify-between gap-16'>
                            <div className='flex flex-col'>
                                <h2 className='my-2'>{meal.name}</h2>
                            </div>
                            <Button onPress={() => onPress(meal)} value={meal.id} className='bg-blue-400 px-3 rounded-lg w-fit'>+</Button>
                        </div>
                        <ul className='relative flex flex-col py-3 px-4 rounded-md bg-slate-700'>
                        {meal.recipes.length > 0 ? (
                            meal.recipes.map((recipe:RecipeType) => (
                                <DraggableItem key={recipe.id} recipes={modalRecipes} setRecipes={setRecipes} recipe={recipe} />
                            ))
                        ):(
                            <li>No recipes added yet</li>
                        )}
                        </ul>
                    </div>
                    ))
                }
            </div>
            <Button className='py-2 px-5 bg-green-700 text-white rounded-md' onPress={handleValidateClick}>Validate Meal Plan</Button>
        </section>
    )
}
export default MealPlannerPage