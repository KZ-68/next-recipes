import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { commentId: string } }) {
    try {
        const { commentId } = params;

        // Check if the comment exists
        const commentBlog = await db.commentBlog.findUnique({
            where: {
                id: commentId
            }
        });

        if (!commentBlog) {
            return new NextResponse('Comment Not Found', { status: 404 });
        }

        // Delete the comment
        await db.commentBlog.delete({
            where: {
                id: commentId
            }
        });

        return new NextResponse('Comment deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[COMMENT]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}