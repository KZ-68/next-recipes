import Draggable, {DraggableCore} from 'react-draggable';
import React, { useEffect, useRef, useState } from 'react'
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface DraggableItemProps {
    recipes: RecipeType[],
    recipe: RecipeType
    setRecipes: React.Dispatch<React.SetStateAction<RecipeType[]>>
}

const DraggableItem:React.FC<DraggableItemProps> = ({recipes, recipe, setRecipes}) => {

    const nodeRef = useRef(null);
    const dragAreaRef = useRef<HTMLDivElement>(null);

    const eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };
    
    return (
        <div ref={dragAreaRef}>
            <Draggable axis='y' onTouchEnd={eventLogger} scale={1} nodeRef={nodeRef}>
                <li ref={nodeRef} draggable={true} className='flex flex-row justify-start gap-2 py-3 px-4 rounded-md bg-slate-800'>
                    <GripVerticalIcon className='cursor-pointer' />
                    <p>{recipe.title}</p>
                    <Button className="flex items-center text-red-500 ml-auto" 
                    onPress={() => {
                        const newRecipesList = recipes.filter((recipesItem) => {
                            if (recipesItem.id != recipe.id) {
                            return recipesItem;
                            }
                        });
                        setRecipes(newRecipesList);
                    }}>
                        <Trash2Icon size={20} />
                    </Button>
                </li>
            </Draggable>
        </div>
    )
}
 
export default DraggableItem;