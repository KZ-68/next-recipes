import React from 'react'
import Image from 'next/image';

interface SuggestionCardProps {
    recipe: RecipeType;
}

const SuggestionCard:React.FC<SuggestionCardProps> = ({recipe}) => {
    
    return (
        <div className='group h-full p-6 rounded-md bg-slate-800 cursor-pointer hover:translate-y-2 duration-300' key={recipe?.id}>
            <Image className='rounded-t-lg' src={`/images/${recipe.image_url}`} alt="Recipe Image" width="320" height="250"/>
            {recipe.title}
        </div>
    )
}

export default SuggestionCard