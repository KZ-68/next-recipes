import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        console.log(body)
        const bodyMeal:Array<MealType[]> = [];
        
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
          findMealMenu.forEach(async(findMealMenuUnique) => {
            if(findMealMenuUnique.name === meal.name) {
              meal.mealrecipes.forEach((mealrecipe:MealRecipeType) => {
                delete mealrecipe.recipe;
                mealrecipe.mealId = findMealMenuUnique.id
              })

              await db.mealRecipe.createMany({
                "data": meal.mealrecipes
              })
    
              await db.meal.update({
                "where": {
                  "id": findMealMenuUnique.id,
                },
                "data": {
                  "mealrecipes": meal.mealrecipes
                },
              })
            }
          })
  
          
        })
        
        console.log(newMenu);
        return NextResponse.json(newMenu)
      } catch (error) {
        console.log(error);
      }
}