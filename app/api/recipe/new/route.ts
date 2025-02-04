import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";

const newRecipeSchema = z.object({
    title: z.string().nonempty({ message: "Title is required"}),
    duration: z.number().min(1, { message: "Duration minimum is 1 min"}),
    instruction: z.string().max(500, {message: "Instruction is too long"}),
    slug: z.string().nonempty({ message: "Slug is required"}),
    rating: z.number().nonnegative({message: "Rating can't be inferior to 0"}).max(5, {message: "Rating can't be more than 5"}),
    vegan: z.boolean().default(false),
    healthy: z.boolean().default(false),
    image_url: z.string().url({message: "Image URL is invalid"}).max(500, {message: "Image URL is too long"})
});

export async function POST(req: NextRequest){
    
    try {
        const recipeBody = await req.json();
        const {title, duration, instruction, slug, rating, image_url, vegan, healthy} = recipeBody

        const newRecipeData = {title, duration, instruction, slug, rating, image_url, vegan, healthy};

        newRecipeSchema.parse(newRecipeData);

        const newRecipe = await db.recipe.create({
            'data':{
                "title": newRecipeData.title,
                "category": recipeBody.category,
                "duration": newRecipeData.duration,
                "instruction": newRecipeData.instruction,
                "slug": newRecipeData.slug,
                "rating": newRecipeData.rating,
                "image_url": newRecipeData.image_url,
                "image_url_cloud": "NULL",
                "vegan": newRecipeData.vegan,
                "healthy": newRecipeData.healthy,
            }
        })
        return NextResponse.json(newRecipe)
    } catch (error) {
        console.log("{MENUS}", error)
        return new NextResponse("Internal Error", {status:500})
    }
}