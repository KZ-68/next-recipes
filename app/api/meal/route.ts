import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const meals = await db.meal.findMany({
            "orderBy": {
                "createdAt": 'desc'
            },
            "include" :{
                "recipes": true
            }
        })
        return NextResponse.json(meals)
    } catch (error) {
        console.log("{MEALS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}