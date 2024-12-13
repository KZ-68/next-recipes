import { NextRequest, NextResponse } from 'next/server'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

export async function POST(req:NextRequest, { params }: { params: { recipeId: string } }) {
    
    const { recipeId } = params;

    const currentUserData = await currentUser()
    if(currentUserData === null) {
      return NextResponse.json({ success: false })
    } else {
      const userId = currentUserData.id;
      const favorites:Array<object> = [];
      
    const prevMetaData = currentUserData.privateMetadata.favoriteRecipes;
    if (Array.isArray(prevMetaData)) {
        prevMetaData.forEach((prevMetaDataElement:RecipeType) => {
        if (prevMetaDataElement.id !== recipeId) {
            favorites.push(prevMetaDataElement)
        }
        });
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
                favoriteRecipes: favorites
            }
        })
    }

      return NextResponse.json({ success: true })
    }
}