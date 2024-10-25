import React, { useState } from 'react'

interface NutritionInfoProps {
    recipe: RecipeType
}

const NutritionInfo:React.FC<NutritionInfoProps> = ({recipe}) => {

    const [recipeState, setRecipeState] = useState<RecipeType>(recipe)
    const [nutrionState, setNutritionState] = useState(null)
            
    const fetchIngredientsNutrition = async () => {
        try {
            const EDAMAM_APPID = process.env.NEXT_PUBLIC_EDAMAM_APPID;
            const EDAMAM_KEY = process.env.NEXT_PUBLIC_EDAMAM_KEY;
            
            const headers = {
                "Content-Type": "application/json"
            }
            
            const response = await fetch(`https://api.edamam.com/api/nutrition-details?app_id=${EDAMAM_APPID}&app_key=${EDAMAM_KEY}`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    'title': recipeState.title,
                    'ingr': recipeState.ingredients
                }),
            })
            if(response.ok) {
                const nutritionalDetailsData = await response.json()
                console.log(nutritionalDetailsData);
                setNutritionState(nutritionalDetailsData);
            }
        } catch(error) {
            console.error("Error submitting data", error);
        }
    }

    fetchIngredientsNutrition()
  return (
    <div></div>
  )
}

export default NutritionInfo