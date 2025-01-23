import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest){
    
    try {
        const articleBody = await req.json();
        const newArticle = await db.article.create({
            'data':{
                "title": articleBody.title,
                "text": articleBody.text,
                "slug": articleBody.slug,
            }
        })
        return NextResponse.json(newArticle)
    } catch (error) {
        console.log("{ARTICLE}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}