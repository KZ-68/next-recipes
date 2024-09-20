import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { articleId: string } }) {
    try {
        const { articleId } = params;

        const comments = await db.commentBlog.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
            "where": {
                "article": {
                    id: articleId
                }
            }
        })
        return NextResponse.json(comments)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}