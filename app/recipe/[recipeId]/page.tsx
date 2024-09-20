"use client"
import CommentRecipe from '@/components/CommentRecipe'
import Category from '@/components/Category'
import React, { useEffect, useState } from 'react'
import { Gauge, TimerIcon, ListChecksIcon, CookingPotIcon } from 'lucide-react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'

const RecipeDetailPage = ({params} : {params : {recipeId: string}}) => {

    const [recipe, setRecipe] = useState<RecipeType | null>(null)

    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`)
            const data : RecipeType = await response.json()
            setRecipe(data)
        }
        fetchrecipe()
    }, [params.recipeId])

    return (
        <div className='mx-8'>
            <section className='flex flex-row'>
                <aside className='flex flex-col rounded-l-md py-14 px-60 md:px-40 my-4 bg-slate-700'>
                    <h1 className='mb-3 text-3xl'>{recipe?.title}</h1>
                    <div className='my-5 flex flex-row flex-wrap gap-4 justify-center'>
                        <Category key={recipe?.category.id} text={recipe?.category.name}/>
                        <p className='flex flex-row gap-1'><TimerIcon/>{recipe?.duration} mins</p>
                    </div>
                </aside>
                <aside></aside>
            </section>

            <section className='flex flex-row my-7'>
                <aside className='flex flex-col'>
                    <h2 className='flex flex-row text-xl'><ListChecksIcon className='mr-5'/>Instructions</h2>
                    <p className='py-4'>{recipe?.instruction}</p>
                </aside>
                <aside>
                    <h2 className='flex flex-row'><CookingPotIcon className='mr-4'/>Ingredients and Tools</h2>
                    <TabGroup>
                        <TabList>
                            <Tab>Igredients</Tab>
                            <Tab>Tools</Tab>
                        </TabList>
                    <TabPanels>
                        <TabPanel>
                            {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                                recipe?.ingredients.map(
                                    (ingredient: IngredientRecipeType) => (
                                        <div key={ingredient.id}>
                                            <h3>{ingredient.ingredient.name}</h3>
                                            <p>{ingredient.quantity} {ingredient.unit}</p>
                                        </div>
                                )
                            )
                            ) : 
                            (
                                <p>
                                    Aucun ingrédient ajouté sur cette recette.
                                </p>
                            )}
                        </TabPanel>
                        <TabPanel>

                        </TabPanel>
                    </TabPanels>
                    </TabGroup>
                </aside>
            </section>
            
            <div className='p-4 mt-8 bg-slate-900 rounded-md'>
                <h2 className='mb-4 text-xl'>Les commentaires ({recipe?.comments.length}) :</h2>
                <ul>
                    {recipe?.comments && recipe.comments.length > 0 ? (
                        recipe?.comments.map((comment: any) => (
                            <CommentRecipe key={comment.id} comment={comment} recipe={recipe}/>
                        ))
                    ) : (
                        <p>
                            Aucun commentaire ajouté sur cet article.
                            
                        </p>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default RecipeDetailPage