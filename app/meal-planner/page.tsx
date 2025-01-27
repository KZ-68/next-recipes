"use client"
// import { db } from '@/lib/db'
import React, { BaseSyntheticEvent, useEffect, useState } from 'react'
import {Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import { CircleCheckIcon } from 'lucide-react';
import Link from 'next/link';
import DraggableItem from '@/components/DraggableItem';
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';

const MealPlannerPage = () => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const [successAlert, setSuccessAlert] = useState<boolean>(false)

    const [recipes, setRecipes] = useState<RecipeType[]>([])
    const [meals, setMeals] = useState<MealType[]>([])
    const [meal, setMeal] = useState<MealType | null>(null)
    const [mealrecipes, setMealRecipes] = useState<MealRecipeType[]>([])
    const [menu, setMenu] = useState<MenuType>({id:'', date:new Date(), meals:[]})
    const [date, setDate] = useState<Date>(new Date(""));
    const [selectedRecipes, setSelectedRecipes] = useState<Array<string>>([])
    
    function handleModalClick() {
        setMealRecipes([])
        selectedRecipes.forEach(selectedRecipe => {
            recipes.forEach(recipe => {
                if(recipe.id === selectedRecipe) {
                    mealrecipes.push({id:'', mealId: meal?meal.id:'', recipeId: recipe.id, recipe: recipe})
                }

            })

        });
        menu.date = date;
        mealrecipes.forEach(mealrecipe1 => {
            meal?.mealrecipes.push(mealrecipe1)
        })
        if(menu.meals.length > 0) {
            menu.meals.forEach(mealMenu => {
                console.log(meal?.id);
                console.log(mealMenu.id);
                if(mealMenu.id !== meal?.id) {
                    menu.meals.push(meal ? meal : {id:'', name:'', createdAt:new Date(), menu:{id:'', date:new Date(), meals:[]}, mealrecipes:[]})
                }
            })
        } else {
            menu.meals.push(meal ? meal : {id:'', name:'', createdAt:new Date(), menu:{id:'', date:new Date(), meals:[]}, mealrecipes:[]})
        } 
        return onClose()
    }

    async function handleValidateClick() {
        if(date !== new Date("")) {
            menu.date = date;
        }

        const response = await fetch(`/api/menu/new`, {
            method: 'POST',
            body: JSON.stringify(menu),
        })

        if (response.ok) {
            setSuccessAlert(true);
        }
    }

    function onPress(mealData:MealType) {
        setMeal(mealData);
        console.log(mealData);
        onOpen();
    }

    const dateHandler = (e:BaseSyntheticEvent) => {
        const dateTarget = new Date(e.target.value);
        setDate(dateTarget);
    }

    function getSelectedOptions(e:BaseSyntheticEvent) {
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
            const mealDinner : MealType = {id: '0', name:'Dinner', createdAt:new Date(), mealrecipes:[], menu:{id:'', date:new Date(), meals:[]}}
            const mealLunch : MealType = {id: '1', name:'Lunch', createdAt:new Date(), mealrecipes:[], menu:{id:'', date:new Date(), meals:[]}}
            const mealBreakfast : MealType = {id: '2', name:'Breakfast', createdAt:new Date(), mealrecipes:[], menu:{id:'', date:new Date(), meals:[]}}
            const dataMeals : MealType[] = [mealDinner, mealLunch, mealBreakfast]
            dataMeals.forEach(dataMeal => {
                dataMeal.mealrecipes = [];
            })
            setRecipes(data)
            setMeals(dataMeals)
            const dataMenu : MenuType = {id:'', meals:[], date: new Date()};
            setMenu(dataMenu);
        }
        multiFetch()
    }, [])

    return (
        <section className='bg-slate-600 rounded-lg text-white relative flex flex-col items-start gap-2 px-4 py-8 mx-4'>
            <ThemeSwitcherScroll/>
            <div className={successAlert === false ? 'hidden opacity-0' : 'absolute bg-slate-200 py-2 px-4 rounded-lg'} id='success-alert'>
                <p className={successAlert === false ? 'hidden opacity-0' : 'text-black opacity-100 flex flex-row gap-2'}><CircleCheckIcon className='bg-green-600 text-white rounded-full'/> Menu Plan added !</p>
            </div>
            <h1 className='text-3xl my-2'>Meal Planer</h1>
            <p className='my-3 dark:text-white'>Create your own menu with one or more meals and their recipes</p>
            <Link className='text-white bg-red-500 py-3 px-4 mb-6 rounded-xl' href='/menu' >
                My Meal Plans
            </Link>
            <label>Select Date :</label>
            <div className='bg-white flex flex-row items-center w-fit rounded-md py-1 px-1 my-1'>
                <input onChange={dateHandler} className='py-1 bg-white text-black' type="date" id="start" name="trip-start" max="2099-12-31" />
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
            <p>Add recipes for the meals you want in your menu :</p>
            <div className='flex flex-row my-2 gap-8'>
                {
                    meals.map((meal:MealType) => (
                        <div key={meal.id} className='flex flex-col gap-5 bg-slate-700 rounded-md w-96 py-3 px-4'>
                            <div className='flex flex-row justify-between gap-16'>
                                <div className='flex flex-col'>
                                    <h2 className='my-2'>{meal.name}</h2>
                                </div>
                                <Button onPress={() => onPress(meal)} value={meal.id} className='bg-blue-400 px-3 rounded-lg w-fit'>+</Button>
                            </div>
                            <ul className='relative h-auto flex flex-col py-3 px-4 rounded-md bg-slate-700'>
                            {meal.mealrecipes.length > 0 ? (
                                meal.mealrecipes.map((mealrecipe:MealRecipeType) => (
                                    <DraggableItem key={mealrecipe?.recipe?.id} recipes={recipes} recipe={mealrecipe.recipe} />
                                ))
                            ):(
                                <p key={0}>No recipes added yet</p>
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