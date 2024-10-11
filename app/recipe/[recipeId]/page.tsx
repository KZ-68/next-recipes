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
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer'
import { formatDate } from '@/lib/utils'
import { currentUser } from '@clerk/nextjs/server'
  
const RecipeDetailPage = ({params} : {params : {recipeId: string, categoryId: string}}) => {

    const router = useRouter();

    const {isSignedIn, user} = useUser();

    const [recipe, setRecipe] = useState<RecipeType | null>(null)
    const [suggestion, setSuggestion] = useState<RecipeType[]>([])
    const [data, setData] = useState({});

    const rating = recipe?.rating;

    const styles = StyleSheet.create({
        title: {
            fontSize: "7mm"
        },
        title_h2: {
            color: "#f97316"
        },
        page: {
            flexDirection: 'column',
            backgroundColor: '#1e293b',
            color: '#FFFFFF',
            fontSize: "6mm"
        },
        section_1: {
            flexDirection: 'column',
            marginVertical: '10mm',
            marginHorizontal: '10mm',
            paddingHorizontal: '30mm',
            paddingVertical: '20mm',
            alignItems: 'center',
            borderRadius: '3mm',
            backgroundColor: '#334155'
        },
        section_1_line_2: {
            flexDirection: 'row',
            gap: "5mm",
            marginVertical: "5mm"
        },
        category_tag: {
            backgroundColor: "#166534",
            fontSize: '3mm',
            padding: '2mm',
            borderRadius: '1mm'
        },
        section_2: {
            flexDirection: 'row',
            marginVertical: '10mm',
            marginHorizontal: '5mm'
        },
        section_2_aside_left: {
            flexDirection: 'column',
            width: '50%'
        },
        section_2_aside_right: {
            flexDirection: 'column',
            width: '50%',
            borderTopLeftRadius: '2mm',
            borderTopRightRadius: '2mm',
            border: 'solid',
            borderWidth: '2mm',
            borderColor: '#334155'
        },
        tabs_block: {
            flexDirection: 'row',
            gap: '2mm',
            marginVertical: '4mm',
            backgroundColor: '#334155',
            paddingVertical: '2mm',
            paddingHorizontal: '3mm',
            borderTopLeftRadius: '2mm',
            borderTopRightRadius: '2mm'
        },
        tabs: {
            borderRadius: '2mm',
            padding: '2mm',
            backgroundColor: '#EA580C'
        },
        ingredients_or_tools_list: {
            flexDirection: 'row',
        },
        ingredients_or_tools_block: {
            flexDirection: 'column',
            fontSize: '4mm',
            marginHorizontal: '2mm'
        },
        section_3: {
            flexDirection: 'column',
            marginHorizontal: '5mm'
        },
        section_3_wrapper: {
            flexDirection: 'row'
        },
        section_3_block: {
            flexDirection: 'column'
        },
        section_4: {
            flexDirection: 'column',
            marginVertical: '10mm',
            marginHorizontal: '5mm'
        },
        comments_block: {
            flexDirection: 'column',
            borderRadius: '2mm',
            paddingVertical: '2mm',
            paddingHorizontal: '3mm',
            marginVertical: '5mm',
            backgroundColor: '#334155'
        },
        comments_block_top: {
            marginVertical: '2mm'
        }
      });

    const PdfFile = () => {
        return (
            <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section_1}>
                    <Text style={styles.title}>{recipe?.title}</Text>
                    <View style={styles.section_1_line_2}>
                        <Text style={styles.category_tag}>{recipe?.category.name}</Text>
                        <Text>{recipe?.duration} mins</Text>
                    </View>
                </View>
                <View style={styles.section_2}>
                    <View style={styles.section_2_aside_left}>
                        <Text style={styles.title_h2}> Instructions</Text>
                        <Text>{recipe?.instruction}</Text>
                    </View>
                    <View style={styles.section_2_aside_left}>
                        <Text style={styles.title_h2}>Ingredients and Tools</Text>
                        <View style={styles.tabs_block}>
                            <Text style={styles.tabs}>Ingredients</Text>
                            <Text style={styles.tabs}>Tools</Text>    
                        </View>
                        <View style={styles.ingredients_or_tools_list}>
                        {recipe?.ingredients && recipe.ingredients.length > 0 ? (
                            recipe?.ingredients.map(
                                (ingredient: IngredientRecipeType) => (
                                    <View style={styles.ingredients_or_tools_block} key={ingredient.id}>
                                        <Text>{ingredient.ingredient.name}</Text>
                                        <Text>{ingredient.quantity} {ingredient.unit}</Text>
                                    </View>
                                )
                            )
                            ) : 
                            (
                                <View style={styles.ingredients_or_tools_block}>
                                    <Text>Aucun ingrédient à été ajouté sur cette recette.</Text>
                                </View>
                            )
                        }
                        </View>
                    </View>
                </View>
                <View style={styles.section_3}>
                    <Text style={styles.title_h2}>Steps ({recipe?.steps.length})</Text>
                    <View style={styles.section_3_wrapper}>
                        {recipe?.steps && recipe.steps.length > 0 ? (
                                recipe?.steps.map(
                                    (step: StepType) => (
                                    <View style={styles.section_3_block} key={step.id}>
                                        <Text>{step.order}</Text>
                                        <Text>{step.text}</Text>
                                    </View>
                                    )
                                )
                            ) : 
                            (
                            <View style={styles.section_3_block}>
                                <Text>No step can be found for this recipe</Text>
                            </View>
                            )
                        }
                    </View>
                </View>
                <View style={styles.section_4}>
                    <Text style={styles.title_h2}>Comments ({recipe?.comments.length})</Text>
                    {recipe?.comments && recipe.comments.length > 0 ? (
                        recipe?.comments.map((comment: CommentType) => (
                            <View style={styles.comments_block} key={comment.id}>
                                <View style={styles.comments_block_top}>
                                    <Text>{formatDate(recipe.createdAt)}</Text>
                                    <Text>{comment.text}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={styles.comments_block}>
                            <Text>
                                Aucun commentaire ajouté sur cet article.
                            </Text>
                        </View>
                    )}
                </View>
            </Page>
            </Document>
        )
    };

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

    const handleCommentSubmit = async(event: React.FormEvent) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/recipe/${params.recipeId}/comments`, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if(response.status === 200) {
                const updatedComments = response.json()
                console.log(updatedComments);
                setRecipe(prev => prev ? { ...prev, comments: updatedComments} : null)
            } else {
                console.error("Error post comment")
            }
        } catch(error) {
            console.error("Error submitting comment", error);
        }
    }

    const handleSaveUserData = async(e) => {
        e.preventDefault()
        if(isSignedIn) {
            try {
                const response = await fetch(`/api/private`, {
                    method: 'POST',
                    body: JSON.stringify({
                        favoriteId: recipe.id
                    }),
                })
                if(response.ok) {
                    console.log("Favorite added !")
                }
            } catch(error) {
                console.error("Error submitting data", error);
            }
        } else {
            return null
        }
    }
    
    const handleChange = (e:any) => {
        setData((prevData) => ({...prevData, [e.target.name]:e.target.value}))
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
                    <div className='flex flex-row gap-5'>
                        <div className='rounded-3xl bg-orange-600 py-2 px-3' key={recipe?.id}>
                            <PDFDownloadLink document={<PdfFile />} fileName='test.pdf' > 
                                Download PDF
                            </PDFDownloadLink>
                        </div>
                        <button type='button' onClick={handleSaveUserData}>Add to Favorites</button>
                    </div>
                </aside>
                <aside>
                    {recipe?.image_url == "" ? (
                        <Image className='rounded-r-md aspect-video object-cover h-96' src={`https://placehold.co/1000x500/png?text=placeholder&font=roboto`} alt="Recipe Image" width="1000" height="500"/>
                    ) : 
                    (
                        <Image className='rounded-r-md aspect-video object-cover h-96' src={`/images/${recipe?.image_url}`} alt="Recipe Image" width="1000" height="500"/>
                    )}
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
                                                <Image className='rounded-2xl object-cover py-2' src={`https://placehold.co/150x150/png?text=placeholder&font=roboto`} alt="Recipe Image" width="150" height="150"/>
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

            <section className='mx-7'>
                <hgroup className='flex flex-row gap-3 text-orange-500 my-5'>
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
                        <div className='flex flex-col gap-3 rounded-md mt-8 mb-14 mx-80 px-24 py-24 h-96 bg-slate-700 justify-center items-center'>
                            No step can be found for this recipe
                        </div>
                    )}
                </Swiper>
            </section>

            <section className='flex flex-col my-5 mx-7'>
                <h2 className='flex flex-row gap-3 my-3 text-lg text-orange-500'><Lightbulb /> Suggestions</h2>
                <div className='flex flex-row gap-4 h-full'>
                    {suggestion?.map((recipe: RecipeType) => (
                        <SuggestionCard key={recipe.id} recipe={recipe} />
                    ))}    
                </div>
            </section>
            
            <section className='my-7 px-6 bg-slate-900 rounded-md'>
                
                    {isSignedIn ? 
                        <div className='flex flex-row gap-3 rounded-md mt-8 mb-14 pl-6 py-6 bg-slate-700 justify-start items-center'>
                            <Image className='rounded-full' src={user.imageUrl} alt="User Avatar" width="80" height="80"/>
                            <div>
                                <h3 className='text-2xl'>{user.username}</h3>
                                <p></p>
                            </div>
                        </div>
                        :
                        (
                            ""
                        )
                    }
                
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
                        <form id="recipe-comment-form" hidden={false} className='flex flex-col gap-6' onSubmit={handleCommentSubmit}>
                            <input className='bg-transparent' type="text" name="text" placeholder='Write your comment here...' onChange={handleChange}/>
                            <button className='w-fit mt-6' type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RecipeDetailPage