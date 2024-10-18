"use client"
import React, { useEffect, useState } from 'react'

interface RecipeOptionProps {
    recipes: RecipeType[]
    title:string
}

const RecipeOption:React.FC<RecipeOptionProps> = ({recipes, meal, title}) => {

    return (
        <div className='bg-slate-800 rounded-md py-3 px-3'>
            <h2>{title}</h2>
            <form action="">
                <select name="" id="">
                    {recipes.map((recipe:RecipeType) => (
                        <option value={recipe.id}>{recipe.title}</option>
                    ))}
                </select>
                <button type='submit'>Add Selected</button>
            </form>
        </div>
    )
}

export default RecipeOption