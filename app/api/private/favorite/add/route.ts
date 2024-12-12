import { NextRequest, NextResponse } from 'next/server'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

export async function POST(req:NextRequest) {
    const currentUserData = await currentUser()
    if(currentUserData === null) {
      return NextResponse.json({ success: false })
    } else {
      const userId = currentUserData.id;
      const body = await req.json();
      const favorites = [];
      if(currentUserData.privateMetadata.favoriteRecipes) {
        const prevMetaData = currentUserData.privateMetadata.favoriteRecipes;
        if (Array.isArray(prevMetaData)) {
          prevMetaData.forEach((prevMetaDataElement:RecipeType) => {
            favorites.push(prevMetaDataElement)
          });
          favorites.push(body.recipe)
          await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: {
              favoriteRecipes: favorites
            }
          })
        }
      } else {
        favorites.push(body.recipe)
        await clerkClient.users.updateUserMetadata(userId, {
          privateMetadata: {
            favoriteRecipes: favorites
          },
        })
      }
      
      return NextResponse.json({ success: true })
    }
}