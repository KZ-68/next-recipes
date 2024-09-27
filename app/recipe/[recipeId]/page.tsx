"use client"
import CommentRecipe from '@/components/CommentRecipe'
import Category from '@/components/Category'
import React, { useEffect, useState } from 'react'
import { Gauge, TimerIcon, ListChecksIcon, CookingPotIcon, WaypointsIcon, ImageIcon } from 'lucide-react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SuggestionCard from '@/components/SuggestionCard'

const RecipeDetailPage = ({params} : {params : {recipeId: string, categoryId: string}}) => {

    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [category, setCategory] = useState<CategoryType | null>(null)

    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`)
            const dataRecipe : RecipeType = await response.json()
            const responseCategory = await fetch(`/api/recipe/${params.recipeId}/${dataRecipe.category.id}`)
            const dataCategory : CategoryType = await responseCategory.json()
            setRecipe(dataRecipe)
            setCategory(dataCategory)
        }

        fetchrecipe()
    }, [params.recipeId, params.categoryId])
    
    return (
        <div className='mx-8'>
            <section className='flex flex-row mx-5'>
                <aside className='flex flex-col flex-wrap rounded-l-md py-16 px-56 bg-slate-700 justify-center items-center'>
                    <h1 className='mb-3 text-3xl w-72 text-center'>{recipe?.title}</h1>
                    <div className='my-5 flex flex-row gap-4 content-center'>
                        <Category key={recipe?.category.id} text={recipe?.category.name}/>
                        <p className='flex flex-row gap-1'><TimerIcon/>{recipe?.duration} mins</p>
                    </div>
                </aside>
                <aside>
                    <Image className='rounded-r-md aspect-video object-cover h-96' src={`/images/${recipe?.image_url}`} alt="Recipe Image" width="1000" height="500"/>
                </aside>
            </section>

            <section className='flex flex-row my-7'>
                <aside className='flex flex-col w-3/6 px-6'>
                    <h2 className='flex flex-row text-xl text-orange-500'><ListChecksIcon className='mr-5'/>Instructions</h2>
                    <p className='py-4'>{recipe?.instruction}</p>
                </aside>
                <aside className='flex flex-col w-3/6 px-4 gap-4'>
                    <h2 className='flex flex-row text-orange-500'><CookingPotIcon className='mr-4'/>Ingredients and Tools</h2>
                    <TabGroup className='border border-gray-600 rounded-lg'>
                        <TabList className='flex flex-row gap-4 py-4 px-4 bg-slate-700'>
                            <Tab className='py-2 px-4 bg-orange-600 rounded-xl'>Ingredients</Tab>
                            <Tab className='py-2 px-4 bg-orange-600 rounded-xl'>Tools</Tab>
                        </TabList>
                    <TabPanels className='py-4 px-2'>
                        <TabPanel>
                            {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                                recipe?.ingredients.map(
                                    (ingredient: IngredientRecipeType) => (
                                        <div className='flex flex-col content-center max-w-fit items-center px-2' key={ingredient.id}>
                                            {ingredient.ingredient.image_url == "" ? (
                                                <ImageIcon size={96}/>
                                            ) : 
                                            (
                                                <Image className='rounded-md object-cover py-2' src={`/images/${ingredient.ingredient.image_url}`} alt="Recipe Image" width="150" height="350"/>
                                            )
                                            }
                                            <h3>{ingredient.ingredient.name}</h3>
                                            <p>{ingredient.quantity} {ingredient.unit}</p>
                                        </div>
                                    )
                                )
                                ) : 
                                (
                                    <p>
                                        Aucun ingrédient à été ajouté sur cette recette.
                                    </p>
                                )}
                        </TabPanel>
                        <TabPanel>
                            {recipe?.tools && recipe.tools.length > 0 ? (
                                recipe?.tools.map(
                                    (tool: ToolRecipeType) => (
                                        <div key={tool.id}>
                                            <h3>{tool.tool.name}</h3>
                                        </div>
                                )
                            )
                            ) : 
                            (
                                <p>
                                    Aucun ustensile a été ajouté sur cette recette.
                                </p>
                            )}
                        </TabPanel>
                    </TabPanels>
                    </TabGroup>
                </aside>
            </section>

            <section>
            <h2 className='flex flex-row gap-3 text-orange-600'><WaypointsIcon/> Steps ({recipe?.steps.length})</h2>
            <Swiper
                pagination={true}
                modules={[Pagination]}
                spaceBetween={50}
                slidesPerView={2}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    {recipe?.steps && recipe.steps.length > 0 ? (
                        recipe?.steps.map(
                            (step: StepType) => (
                                <SwiperSlide key={step.id}>
                                    <div className='flex flex-col gap-3 rounded-md mt-8 mb-14 px-24 py-24 h-96 bg-slate-700 justify-center items-center' key={step.id}>
                                        <h3 className='text-xl text-orange-600' >{step.order}</h3>
                                        <p>{step.text}</p>
                                    </div>
                                </SwiperSlide>
                            )
                        )
                    ) : 
                    (
                        <div>No step can be found for this recipe</div>
                    )}
                </Swiper>
            </section>

            <section>
                <h2 className='flex flex-row gap-3'>Suggestions</h2>
                <div>
                    {category?.recipes.map((recipe: RecipeType) => (
                        <SuggestionCard key={category.id} recipe={recipe} category={category}/>
                    ))}
                </div>
            </section>
            
            <div className='my-7 px-6 bg-slate-900 rounded-md'>
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