import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {commentId: string}}) {
    const { commentId } = params;
    try {
        const commentRecipe = await db.commentRecipe.findUnique({
            "where": {
                "id": commentId
            },
        })
        return NextResponse.json(commentRecipe)
    } catch (error) {
        console.log("{COMMENT}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}