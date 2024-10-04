import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const commentsBlog = await db.commentBlog.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
        })
        return NextResponse.json(commentsBlog)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}