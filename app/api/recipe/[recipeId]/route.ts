import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {recipeId: string}}) {
    const { recipeId } = params;
    try {
        const recipe = await db.recipe.findUnique({
            "where": {
                "id": recipeId
            },
            "include": {
                "category":true,
                "comments": {
                    "orderBy": {
                        "createdAt": "desc"
                    }
                }
            }
        })
        return NextResponse.json(recipe)
    } catch (error) {
        console.log("{ARTICLE}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}