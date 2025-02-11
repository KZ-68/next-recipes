import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editArticleSchema = z.object({
    title: z.string().nonempty({ message: "Title is required" }),
    text: z.string().nonempty({ message: "Text is required" }),
    slug: z.string().nonempty({ message: "Slug is required" }),
});

export async function POST(request: NextRequest, { params }: { params: { articleId: string } }) {
    try {
        const { articleId } = await params;

        const body = await request.json();
        const { userId, title, text, slug } = body;

        if (!userId || !articleId) {
            return NextResponse.json(
                { error: "User ID and Article ID are required" },
                { status: 400 }
            );
        }

        const articleData = { title, text, slug };

        editArticleSchema.parse(articleData);

        const editarticle = await db.article.update({
            where: {
                id: articleId,
            },
            data: {
                title: articleData.title,
                text: articleData.text,
                slug: articleData.slug,
            },
        });

        return NextResponse.json({
            success: true,
            message: "article Edited !",
            data: editarticle,
        });
    } catch (error) {
        console.log("[EDIT article]", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `edit article: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
}