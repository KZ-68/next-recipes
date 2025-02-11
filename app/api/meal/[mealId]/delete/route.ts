import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { mealId: string } }) {
    try {
        const { mealId } = await params;
        const body = await request.json();
        const { userId } = body;

        if (!userId || !mealId) {
            return NextResponse.json(
                { error: "User ID and meal ID are required" },
                { status: 400 }
            );
        }

        await db.meal.delete({
            where: { id: mealId },
        });

        return NextResponse.json({
            success: true,
            message: "Meal as been deleted ",
        });
    } catch (error) {
        console.error("[Meal DELETED]", error);
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}