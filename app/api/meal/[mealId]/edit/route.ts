import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const editMealSchema = z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    menuId: z.string().nonempty({ message: "A Menu ID is required" }),
});

export async function POST(request: NextRequest, { params }: { params: { mealId: string } }) {
    try {
        const { mealId } = await params;

        const body = await request.json();
        const { userId, name, menuId } = body;

        if (!userId || !mealId) {
            return NextResponse.json(
                { error: "User ID and Meal ID are required" },
                { status: 400 }
            );
        }

        const mealData = { name, menuId };

        editMealSchema.parse(mealData);

        const editmeal = await db.meal.update({
            where: {
                id: mealId,
            },
            data: {
                name: mealData.name,
                menuId: mealData.menuId,
            },
        });

        return NextResponse.json({
            success: true,
            message: "meal Edited !",
            data: editmeal,
        });
    } catch (error) {
        console.log("[EDIT meal]", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.errors[0].message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            data: null,
            success: false,
            message: `edit meal: Internal Error:  ${error || "nothing"}`
        }, { status: 500 }
        )
    }
}