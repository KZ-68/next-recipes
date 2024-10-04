import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface SuggestionCardProps {
    recipe: RecipeType;
}

const SuggestionCard:React.FC<SuggestionCardProps> = ({recipe}) => {
    
    return (
        <Link href={`${recipe.id}`} key={recipe.id}>
            <div className='group h-full p-6 rounded-md bg-slate-800 cursor-pointer hover:translate-y-2 duration-300' key={recipe?.id}>
                <Image className='rounded-t-lg' src={`/images/${recipe.image_url}`} alt="Recipe Image" width="250" height="250"/>
                <h3>{recipe.title}</h3>
            </div>
        </Link>
    )
}

export default SuggestionCard