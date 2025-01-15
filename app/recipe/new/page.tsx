"use client"
import React from 'react'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';
import { useFormState } from 'react-dom';

const NewRecipePage = () => {

    async function newRecipeForm(prevState: { message: string }, formData:FormData) {
        "use server";
        const recipeTitle = formData.get("title") as string;
        const recipeInstruction = formData.get("instruction") as string;
        const recipeSlug = formData.get("slug") as string;
        const recipeImageUrl = formData.get("image_url") as string;
        const recipeImageUrlCloud = formData.get("image_url_cloud") as string;
        const recipeVegan = formData.get("vegan");
        const recipeHealthy = formData.get("healthy");
        const recipeRating = formData.get("rating");
        const recipeDuration = formData.get("duration");
        const bodyForm = ({
            title: recipeTitle,
            instruction: recipeInstruction, 
            slug: recipeSlug,
            image_url: recipeImageUrl,
            image_url_cloud: recipeImageUrlCloud,
            vegan: recipeVegan,
            healthy: recipeHealthy,
            rating: recipeRating,
            duration: recipeDuration
        })
        try {
            await fetch(`/api/recipe/new`, {
                method: 'POST',
                body: JSON.stringify({
                    recipe : bodyForm
                }),
            })
            alert(`Added "${recipeTitle}"`);
        } catch (err) {
            return err.toString();
        }
    }
      const [formState, formAction] = useFormState(newRecipeForm, null);
      return (
        <>
            <ThemeSwitcherScroll/>
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
                    <input type='number' min="1" max="1000" name="recipe-duration" id="recipe-duration" />
                    <label className='text-white' htmlFor="rating">Rating : </label>
                    <input type='number' name="recipe-rating" id="recipe-rating"/>
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
                    {!!formState && <p>{formState}</p>}
                </form>
            </div>
            
        </>
      );
}

export default NewRecipePage