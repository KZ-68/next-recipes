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
            <h1>New Recipe</h1>
            <p>With this form, you can add a new recipe</p>
            <form action={formAction} id="signup-form">
                <label htmlFor="title">Title : </label>
                <input type='text' name="recipe-title" id="recipe-title" placeholder="Add a title..." />
                <label htmlFor="text">Text : </label>
                <input type='text' name="recipe-instruction" id="recipe-instruction" placeholder="Add a text..." />
                <label htmlFor="title">Slug : </label>
                <input type='text' name="recipe-slug" id="recipe-slug" placeholder="Add a slug..." />
                <label htmlFor="duration">Duration : </label>
                <input type='number' min="1" max="1000" name="recipe-duration" id="recipe-duration" />
                <label htmlFor="rating">Rating : </label>
                <input type='number' name="recipe-rating" id="recipe-rating"/>
                <fieldset>
                    <legend>Vegan ?</legend>
                    <input type="radio" id="vegan-true" name="vegan" value="true" />
                    <label htmlFor="true">True</label><br />
                    <input type="radio" id="vegan-false" name="vegan" value="false" />
                    <label htmlFor="false">False</label><br />
                </fieldset>
                <fieldset>
                    <legend>Healthy ?</legend>
                    <input type="radio" id="healthy-true" name="healthy" value="true" />
                    <label htmlFor="true">True</label><br />
                    <input type="radio" id="healthy-false" name="healthy" value="false" />
                    <label htmlFor="false">False</label><br />
                </fieldset>
                <button className='py-2 px-2 rounded-lg bg-indigo-500 text-white' type='submit'>Add</button>
                {!!formState && <p>{formState}</p>}
            </form>
        </>
      );
}

export default NewRecipePage