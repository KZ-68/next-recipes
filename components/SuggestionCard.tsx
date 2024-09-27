import React, { useEffect, useState }  from 'react'

interface SuggestionCardProps {
    recipe: RecipeType;
    category: CategoryType;
}

const SuggestionCard:React.FC<SuggestionCardProps> = ({recipe, category}) => {

    const recipeSuggestion = recipe;
    const [recipeCategorySuggestion, setRecipeCategorySuggestion] = useState<CategoryType>(category)

    useEffect(() => {
        const fetchrecipe = async () => {
            const response = await fetch(`/api/recipe/${recipeSuggestion.id}/suggestion/${recipeCategorySuggestion.id}`)
            const data: CategoryType = await response.json()
            setRecipeCategorySuggestion(data) 
        }

        fetchrecipe()
    }, [recipeSuggestion.id, recipeCategorySuggestion.id])
    
    return (
        <div className='group border border-slate-500 p-6 rounded-md hover:bg-slate-700 cursor-pointer hover:translate-y-2 duration-300 md:h-full' key={recipeSuggestion?.id}>
            {recipeSuggestion.title}
        </div>
    )
}

export default SuggestionCard