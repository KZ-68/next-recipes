import React from 'react'
import Button from './Button'
import { useRouter } from 'next/navigation';
import { Gauge, TimerIcon } from 'lucide-react';
import Category from './Category';
import Image from 'next/image';

interface RecipeCardProps {
    recipe: RecipeType;
}

const RecipeCard:React.FC<RecipeCardProps> = ({recipe}) => {

    const router = useRouter();

    const rating = recipe.rating;
    const gaugeArray = [];

    for (let i = 0; i < rating; i++) {
        gaugeArray.push(i);
    }

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this recipe ?')
        if(!confirmDelete) return;

        try {
            const res = await fetch(`/api/recipe/${recipe.id}/delete`, {
                method: 'DELETE'
            })

            router.push('/recipe')
        } catch(error) {
            console.error("Error deleting recipe")
        }
    }

    return (
        <div className='w-80 group rounded-lg bg-slate-800 cursor-pointer duration-300 md:h-full' key={recipe.id}>
            
            <Image className='rounded-t-lg' src={`/images/${recipe.image_url}`} alt="Recipe Image" width="320" height="250"/>
            
            <div className='flex flex-col items-start px-5 py-4'>
                <h2 className='text-2xl md:text-xl font-bold'>{recipe.title}</h2>
                
                <div className='flex flex-wrap gap-2 my-4 md:leading-8'>
                <Category text={recipe.category.name} key={recipe.category.id}/>
                </div>
                
                <p className='line-clamp-4'><TimerIcon/> {recipe.duration} mins</p>

                <div className='flex flex-row'>
                    {gaugeArray.map((gaugeIcon:any)=> (
                        <Gauge key={gaugeIcon}/>
                    ))}
                </div>
                
                <Button href={`recipe/${recipe.id}`} key={recipe.id} label='View Recipe ->' />
            </div>
        </div>
    )
}

export default RecipeCard