"use client"
import CommentRecipe from '@/components/CommentRecipe'
import Category from '@/components/Category'
import React, { useEffect, useState } from 'react'
import { Gauge, TimerIcon, ListChecksIcon, CookingPotIcon, WaypointsIcon, ImageIcon, Lightbulb, MessageSquareQuoteIcon, MessageSquareMoreIcon } from 'lucide-react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import SuggestionCard from '@/components/SuggestionCard'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

const RecipeDetailPage = ({params} : {params : {recipeId: string, categoryId: string}}) => {

    const router = useRouter();

    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [suggestion, setSuggestion] = useState<RecipeType[]>([])

    const rating = recipe?.rating;

    const getGaugeIcon = () => {
        const gaugeArray = [];
        for (let id = 0; id < 5; id++) {
            if(rating) {
                if(id <= rating) {
                    gaugeArray.push(<Gauge color='#e06020' key={id}></Gauge>);
                } else {
                gaugeArray.push(<Gauge key={id}></Gauge>);
                }
            } else {
                gaugeArray.push(<Gauge key={id}></Gauge>);
            }
        }
        return gaugeArray;
    };

    const handleCommentSubmit = async (event:any) => {

        const formData = new FormData(event.target);
        try {
            const response = await fetch(`/api/recipe/${params.recipeId}/comments`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            })

            if(response.ok) {
                console.log(response)
                const updatedComments = await response.json();
                setRecipe(prev => prev ? { ...prev, comments: updatedComments} : null)
            } else {
                console.error("Error post comment")
            }
        } catch(error) {
            console.error("Error submitting comment", error);
        }
    }

    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch(`/api/recipe/${params.recipeId}`)
            const dataRecipe : RecipeType = await response.json()
            const responseSuggestion = await fetch(`/api/recipe/${dataRecipe.id}/suggestion/${dataRecipe.category.id}/${dataRecipe.id}`)
            const dataSuggestion : RecipeType[] = await responseSuggestion.json()
            setRecipe(dataRecipe)
            setSuggestion(dataSuggestion)
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
                        <p className='flex flex-row gap-1 w-24'><TimerIcon/>{recipe?.duration} mins</p>
                        <div className='flex flex-row'>
                            {getGaugeIcon()}
                        </div>
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
                        <TabList className='flex flex-row gap-4 py-4 px-4 bg-slate-700 rounded-t-md'>
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
                                                <Image className='rounded-2xl object-cover py-2' src={`/images/${ingredient.ingredient.image_url}`} alt="Recipe Image" width="150" height="150"/>
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
                <hgroup className='flex flex-row gap-3 text-orange-500'>
                    <WaypointsIcon />
                    <h2>Steps ({recipe?.steps.length})</h2>
                </hgroup>
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

            <section className='flex flex-col'>
                <h2 className='flex flex-row gap-3 my-3 text-lg text-orange-500'><Lightbulb /> Suggestions</h2>
                <div className='flex flex-row gap-4 h-full'>
                    {suggestion?.map((recipe: RecipeType) => (
                        <SuggestionCard key={recipe.id} recipe={recipe} />
                    ))}    
                </div>
            </section>
            
            <section className='my-7 px-6 bg-slate-900 rounded-md'>
                <h2 className='flex flex-row gap-3 mb-4 text-xl text-orange-500'><MessageSquareQuoteIcon/> Comments ({recipe?.comments.length}) :</h2>
                <ul>
                    {recipe?.comments && recipe.comments.length > 0 ? (
                        recipe?.comments.map((comment: CommentType) => (
                            <CommentRecipe key={comment.id} comment={comment} recipe={recipe}/>
                        ))
                    ) : (
                        <div className='py-6 px-14 bg-slate-800 rounded-lg'>
                            <p>Aucun commentaire ajouté sur cet article.</p>
                        </div>
                    )}
                </ul>
                <div className='my-10'>
                    <h2 className='flex flex-row gap-3 mb-4 text-xl text-orange-500'><MessageSquareMoreIcon/> Write a comment</h2>
                    <div className='my-6 py-6 px-14 bg-slate-800 rounded-lg'>
                        <form className='flex flex-col gap-6' action={handleCommentSubmit}>
                            <input className='bg-transparent' type="text" name="text" placeholder='Write your comment here...'/>
                            <button className='w-fit mt-6' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecipeDetailPage