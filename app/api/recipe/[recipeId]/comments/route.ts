import { db } from "@/lib/db";
import { useUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { recipeId: string } }) {
    try {
        const { recipeId } = params;

        const comments = await db.commentRecipe.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
            "where": {
                "recipe": {
                    id: recipeId
                }
            }
        })
        return NextResponse.json(comments)
    } catch (error) {
        console.log("{COMMENTS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}

export async function POST(req: NextRequest, { params }: { params: { recipeId: string } }) {
    const {isSignedIn, user} = useUser();
    if(!isSignedIn) {
        return null;
    }

    try {
        const { recipeId } = params;
        const body = await req.json();
        console.log(body.text)
    
        const newComment = await db.commentRecipe.create({
          "data": {
            "text": body.text,
            "recipeId": recipeId,
            "user": user.username? user.username : ''
          }
        });
    
        console.log(newComment);
        return NextResponse.json(newComment)
      } catch (error) {
        console.log(error);
      }
}