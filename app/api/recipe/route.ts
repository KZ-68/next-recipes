import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const recipes = await db.recipe.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
            "include": {
                "category":true,
                "ingredients" : {
                    "orderBy" : {
                        "unit":"asc"
                    }
                }
            }
        })
        return NextResponse.json(recipes)
    } catch (error) {
        console.log("{RECIPES}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}