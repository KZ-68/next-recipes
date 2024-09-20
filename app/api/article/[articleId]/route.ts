import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, {params} : {params : {articleId: string}}) {
    const { articleId } = params;
    try {
        const article = await db.article.findUnique({
            "where": {
                "id": articleId
            },
            "include": {
                "tags":{
                    "include":{
                        "tag":true
                    }
                },
                "comments": {
                    "orderBy": {
                        "createdAt": "desc"
                    }
                }
            }
        })
        return NextResponse.json(article)
    } catch (error) {
        console.log("{ARTICLE}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}