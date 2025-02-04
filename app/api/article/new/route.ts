import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const newArticleSchema = z.object({
    title: z.string().nonempty({ message: "Title is required"}),
    text: z.string().nonempty({ message: "Text is required" }),
    slug: z.string().nonempty({ message: "Slug is required"}).
});

export async function POST(req: NextRequest){
    
    try {
        const articleBody = await req.json();
        const {title, text, slug} = articleBody;

        const newArticleData = {title, text, slug};
        newArticleSchema.parse(newArticleData);

        const newArticle = await db.article.create({
            'data':{
                "title": newArticleData.title,
                "text": newArticleData.text,
                "slug": newArticleData.slug,
            }
        })
        return NextResponse.json(newArticle)
    } catch (error) {
        console.log("{ARTICLE}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}