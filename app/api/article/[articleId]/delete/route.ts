import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { articleId: string } }) {
    try {
        const { articleId } = params;

        // Check if the article exists
        const article = await db.article.findUnique({
            where: {
                id: articleId
            }
        });

        if (!article) {
            return new NextResponse('Article Not Found', { status: 404 });
        }

        // Delete the article
        await db.article.delete({
            where: {
                id: articleId
            }
        });

        return new NextResponse('Article deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[ARTICLE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}