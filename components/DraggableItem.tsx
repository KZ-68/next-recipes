import Draggable from 'react-draggable';
import React, { useRef } from 'react'
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface DraggableItemProps {
    meal: MealType
    recipe: RecipeType
}

const DraggableItem:React.FC<DraggableItemProps> = ({meal, recipe, setMeal}) => {

    const nodeRef = useRef(null);
    const dragAreaRef = useRef<HTMLDivElement>(null);

    const eventLogger = (e: MouseEvent, data: object) => {
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
                       meal.mealrecipes = [];
                       setMeal(meal);
                       meal.mealrecipes.length = 0;
                    }}>
                        <Trash2Icon size={20} />
                    </Button>
                </li>
            </Draggable>
        </div>
    )
}
 
export default DraggableItem;