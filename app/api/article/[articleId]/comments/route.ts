import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

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

const postCommentArticleSchema = z.object({
    text: z.string().nonempty({ message: "Text is required" }),
    articleId: z.string().nonempty({message:"Article ID can't be empty"})
});

export async function POST(req: NextRequest, { params }: { params: { articleId: string } }) {

    const currentUserData = await currentUser()

    try {
        const { articleId } = params;
        const body = await req.json();
        const { text } = body;

        const commentArticleData = { text };
        postCommentArticleSchema.parse(commentArticleData);
    
        const newComment = await db.commentBlog.create({
          "data": {
            "text": commentArticleData.text,
            "articleId": articleId,
            "user": currentUserData?.username? currentUserData.username : ''
          }
        });
    
        console.log(newComment);
        return NextResponse.json(newComment)
      } catch (error) {
        console.log(error);
      }
}