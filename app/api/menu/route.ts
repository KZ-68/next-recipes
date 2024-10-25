import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const menus = await db.menu.findMany({
            "orderBy": {
                "date": 'desc'
            },
            "include": {
                "menumeals": {
                    "orderBy": {
                        "createdAt": "desc"
                    },
                    "include": {
                        "meal": {
                            "include": {
                                "mealrecipes": {
                                    "include" :{
                                        "recipe": true
                                    }
                                }
                            }
                        }
                    }
                },
            }
        })
        return NextResponse.json(menus)
    } catch (error) {
        console.log("{MENUS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}

