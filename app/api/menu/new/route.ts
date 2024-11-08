import { db } from "@/lib/db";
import { X } from "lucide-react";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        console.log(body)
        let bodyMeal = [];
        let bodyRecipes = []
        
        body.meals.forEach(meal => {
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

        body.meals.forEach(async(meal) => {
          meal.recipes.forEach(recipe => {
            bodyRecipes.push(recipe.id)
          })
        })
        
        findMealMenu.forEach(async(mealMenu) => {
          bodyRecipes.forEach(async(bodyRecipe) => {
            console.log(bodyRecipe);
            const updateMeal = await db.recipe.update({
              "where": {
                "id": bodyRecipe,
              },
              "data": {
                "mealId": mealMenu.id
              },
            })
          })
          
        })
        
        console.log(newMenu);
        return NextResponse.json(newMenu)
      } catch (error) {
        console.log(error);
      }
}