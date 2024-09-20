import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { recipeId: string } }) {
    try {
        const { recipeId } = params;

        const comments = await db.commentRecipe.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
            "where": {
                "recipe": {
                    id: recipeId
                }
            }
        })
        return NextResponse.json(comments)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}