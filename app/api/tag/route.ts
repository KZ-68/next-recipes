import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const recipes = await db.tag.findMany({
            "include": {
                "articleTags":true,
            }
        })
        return NextResponse.json(recipes)
    } catch (error) {
        console.log("{TAGS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}