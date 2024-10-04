import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {categoryId: string, currentRecipeId: string}}) {
    const { categoryId, currentRecipeId } = params;
    try {

        const recipeCount = await db.recipe.count({
            "where":{
                "categoryId": categoryId,
                "NOT": {
                    "id": currentRecipeId
                }
            }
        })

        const skip = Math.floor((recipeCount) * Math.random());

        const recipe = await db.recipe.findMany({
            "where":{
                "categoryId": categoryId,
                "NOT": {
                    "id": currentRecipeId
                }
            },
            "take": 3,
            "skip": skip,
            "include": {
                "category": true
            }
        })

        return NextResponse.json(recipe)
    } catch (error) {
        console.log("{RECIPE}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}