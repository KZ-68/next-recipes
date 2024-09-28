import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {categoryId: string}}) {
    const { categoryId } = params;
    try {

        const recipe = await db.recipe.findMany({
            "where":{
                "categoryId": categoryId
            },
            "orderBy": {
                "title": "asc"
            }
        })

        const recipeCount = recipe.length;
        const firstRecipeId = recipe[0];
        const cursor = firstRecipeId.id;
        const skip = 1 + Math.floor((recipeCount - 1) * Math.random());

        const category = await db.category.findUnique({
            "where": {
                "id": categoryId,
            },
            "include": {
                "recipes": {
                    "cursor": {
                        "id": cursor,
                    },
                    "take": 3,
                    "skip": skip,
                    "orderBy": {
                        "title": "asc"
                    },
                }
            },
        })

        return NextResponse.json(category)
    } catch (error) {
        console.log("{CATEGORY}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}