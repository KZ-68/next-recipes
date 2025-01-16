"use client"
import React from 'react'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { recipeFormAction } from "@/components/newRecipeForm";
import { useFormState } from 'react-dom';

const initialState = {
    message: '',
    success: false
}

const NewRecipePage = () => {
    const [formState, formAction] = useFormState(recipeFormAction, initialState);
    return (
    <>
        <ThemeSwitcherScroll/>
        {formState?.success === true && (
            <p id="success" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>{formState?.message}</p>
        )}
        {formState?.success === false && (
            <p id="error" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><XCircleIcon className='text-white bg-red-600 rounded-full'/>{formState?.message}</p>
        )}
        <h1 className='text-2xl text-white'>New Recipe</h1>
        <p className='text-white'>With this form, you can add a new recipe</p>
        <div className='flex flex-col py-8 px-6 mx-80 rounded-lg bg-slate-800'>
            <form className='flex flex-col gap-6 py-8 px-6 rounded-2xl' action={formAction} id="signup-form">
                <label className='text-white' htmlFor="title">Title : </label>
                <input type='text' name="recipe-title" id="recipe-title" placeholder="Add a title..." />
                <label className='text-white' htmlFor="text">Text : </label>
                <input type='text' name="recipe-instruction" id="recipe-instruction" placeholder="Add a text..." />
                <label className='text-white' htmlFor="title">Slug : </label>
                <input type='text' name="recipe-slug" id="recipe-slug" placeholder="Add a slug..." />
                <label className='text-white' htmlFor="duration">Duration : </label>
                <input type='number' min="1" max="1000" name="recipe-duration" id="recipe-duration" placeholder='1' />
                <label className='text-white' htmlFor="rating">Rating : </label>
                <input type='number' min="0" max="5" name="recipe-rating" id="recipe-rating" placeholder='0'/>
                <fieldset>
                    <legend className='text-white'>Vegan ?</legend>
                    <input type="radio" id="vegan-true" name="vegan" value="true" />
                    <label className='text-white' htmlFor="true">True</label><br />
                    <input type="radio" id="vegan-false" name="vegan" value="false" />
                    <label className='text-white' htmlFor="false">False</label><br />
                </fieldset>
                <fieldset>
                    <legend className='text-white'>Healthy ?</legend>
                    <input type="radio" id="healthy-true" name="healthy" value="true" />
                    <label className='text-white' htmlFor="true">True</label><br />
                    <input className='text-white' type="radio" id="healthy-false" name="healthy" value="false" />
                    <label htmlFor="false">False</label><br />
                </fieldset>
                <button className='py-2 px-2 rounded-lg bg-indigo-500 text-white' type='submit'>Add</button>
            </form>
        </div>
        
    </>
    );
}

export default NewRecipePage