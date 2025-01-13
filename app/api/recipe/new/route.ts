import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){
    
    try {
        const recipeBody = await req.json();
        const newRecipe = await db.recipe.create({
            'data':{
                "title": recipeBody.title,
                "category": recipeBody.category,
                "duration": recipeBody.duration,
                "instruction": recipeBody.instruction,
                "slug": recipeBody.slug,
                "rating": recipeBody.rating,
                "image_url": recipeBody.image_url,
                "image_url_cloud": recipeBody.image_url_cloud,
                "vegan": recipeBody.vegan,
                "healthy": recipeBody.healthy,
            }
        })
        return NextResponse.json(newRecipe)
    } catch (error) {
        console.log("{MENUS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}