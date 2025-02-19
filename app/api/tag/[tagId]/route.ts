import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {tagId: string}}) {
    const { tagId } = params;
    try {
        const tag = await db.tag.findUnique({
            "where": {
                "id": tagId
            },
            "include": {
                "articleTags":true
            }
        })
        return NextResponse.json(tag)
    } catch (error) {
        console.log("{TAG}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}