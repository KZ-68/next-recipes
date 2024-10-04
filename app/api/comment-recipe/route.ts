import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const commentsRecipe = await db.commentRecipe.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
        })
        return NextResponse.json(commentsRecipe)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}