import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE({ params }: { params: { recipeId: string } }) {
    try {
        const { recipeId } = params;

        // Check if the recipe exists
        const recipe = await db.recipe.findUnique({
            where: {
                id: recipeId
            }
        });

        if (!recipe) {
            return new NextResponse('Recipe Not Found', { status: 404 });
        }

        // Delete the recipe
        await db.recipe.delete({
            where: {
                id: recipeId
            }
        });

        return new NextResponse('Recipe deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[RECIPE]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}