import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        console.log(body)
        let mealBody = [];
        body.menumeals.forEach(menumeal => {
          mealBody.push({mealId: menumeal.meal}) 
        })
        console.log(mealBody);
        const newMenu = await db.menu.create({
          "data": {
            "date": body.date,
            "menumeals": {
                "createMany": {
                  "data": mealBody,
                },
              },
          }
        });
    
        console.log(newMenu);
        return NextResponse.json(newMenu)
      } catch (error) {
        console.log(error);
      }
}