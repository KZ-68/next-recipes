"use server"

export async function recipeFormAction(prevState: { success: boolean; message: string; } | Promise<{ success: boolean; message: string; } | null> | null, formData:FormData) {
    prevState = null;
    
    const recipeTitle = formData.get("title") as string;
    const recipeInstruction = formData.get("instruction") as string;
    const recipeSlug = formData.get("slug") as string;
    const recipeImageUrl = formData.get("image_url") as string;
    const recipeVegan = formData.get("vegan");
    const recipeHealthy = formData.get("healthy");
    const recipeRating = formData.get("rating");
    const recipeDuration = formData.get("duration");
    const bodyForm = ({
        title: recipeTitle,
        instruction: recipeInstruction, 
        slug: recipeSlug,
        image_url: recipeImageUrl,
        vegan: recipeVegan,
        healthy: recipeHealthy,
        rating: recipeRating,
        duration: recipeDuration
    })
    
    const response = await fetch(process.env.URL + `/api/recipe/new`, {
        method: 'POST',
        body: JSON.stringify({
            recipe : bodyForm
        }),
    })

    if(response.ok) {
        return {
            success: true,
            message: 'Recipe added successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the recipe creation process',
        };
    }
}
