"use client"
import React from 'react'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';
import { useFormState } from 'react-dom';

const NewRecipePage = () => {

    async function newRecipeForm(prevState: { message: string }, formData:FormData) {
        "use server";
        const recipeTitle = formData.get("title") as string;
        const recipeText = formData.get("instruction") as string;
        const recipeSlug = formData.get("slug") as string;
        const bodyForm = ({
            title: recipeTitle,
            text: recipeText, 
            slug: recipeSlug
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
                <button>Add</button>
                {!!formState && <p>{formState}</p>}
            </form>
        </>
      );
}

export default NewRecipePage