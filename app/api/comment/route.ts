import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        const comments = await db.comment.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
        })
        return NextResponse.json(comments)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}