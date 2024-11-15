import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface SuggestionCardProps {
    recipe: RecipeType;
}

const SuggestionCard:React.FC<SuggestionCardProps> = ({recipe}) => {
    
    return (
        <div className='group h-full pb-2 rounded-md bg-slate-800 cursor-pointer hover:translate-y-2 duration-300' key={recipe?.id}>
            {recipe.image_url == "" ? (
                <Image className='rounded-t-lg h-[250px]' src={`https://placehold.co/250x250/png?text=placeholder&font=roboto`} alt="Recipe Image" width="250" height="250"/>
            ) : 
            (
                <Image className='rounded-t-lg h-[250px]' src={`/images/${recipe.image_url}`} alt="Recipe Image" width="250" height="250"/>
            )}
            <hgroup className='flex flex-col gap-2 my-2 px-6'>
                <h3 className='mx-1'>{recipe.title}</h3>
                <button className='text-white w-fit mx-1'>
                    <Link href={`${recipe.id}`} key={recipe.id}>View Recipe {'->'}</Link>
                </button>
            </hgroup>
        </div>
        
    )
}

export default SuggestionCard