import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {categoryId: string}}) {
    const { categoryId } = params;
    try {
        const recipeCount = await db.recipe.count();
        const skip = Math.floor(Math.random() * recipeCount);

        const category = await db.category.findUnique({
            "where": {
                "id": categoryId,
            },
            "include": {
                "recipes": {
                    "take": 2,
                    "skip": skip,
                    "orderBy": {
                        "title": "asc"
                    },
                }
            }
        })
        return NextResponse.json(category)
    } catch (error) {
        console.log("{CATEGORY}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}