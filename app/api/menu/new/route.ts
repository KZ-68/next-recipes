import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const bodyMeal: { name: string; }[] = [];
        let mealRecipesData: { mealId: string; recipeId: string; }[] = [];

        body.meals.forEach((meal:MealType) => {
          bodyMeal.push({name:meal.name})
        })

        const newMenu = await db.menu.create({
          "data": {
            "date": body.date,
            "meals": {
              "createMany": {
                "data" : bodyMeal
              }
            }  
          },
        });

        const findMealMenu = await db.meal.findMany({
          "where": {
            "menuId": newMenu.id
          }
        })

        body.meals.forEach(async(meal:MealType) => {
          mealRecipesData = [];
          findMealMenu.forEach(async(findMealMenuUnique) => {
            if(findMealMenuUnique.name === meal.name) {
              meal.mealrecipes.forEach(async(mealrecipe:MealRecipeType) => {
                mealrecipe.mealId = findMealMenuUnique.id
                meal.id = findMealMenuUnique.id;
              })
            }
          })

          meal.mealrecipes.forEach(async(mealrecipe:MealRecipeType) => {
            mealRecipesData.push({
              mealId: mealrecipe.mealId,
              recipeId: mealrecipe.recipeId
            })
          })
  
          await db.mealRecipe.createMany({
            "data": mealRecipesData
          })

          await db.meal.update({
            "where": {
              "id": meal.id,
            },
            "data": {
              "mealrecipes": {
                "createMany": {
                  "data": mealRecipesData
                }
              }
            }
          })
        })
        
        console.log(newMenu);
        return NextResponse.json(newMenu)
      } catch (error) {
        console.log(error);
      }
}