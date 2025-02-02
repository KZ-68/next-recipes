import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest, { params }: { params: { articleId: string } }) {

    const currentUserData = await currentUser()

    try {
        const { articleId } = params;
        const body = await req.json();
    
        const newComment = await db.commentBlog.create({
          "data": {
            "text": body.text,
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