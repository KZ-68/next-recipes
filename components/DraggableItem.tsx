import Draggable, {DraggableCore} from 'react-draggable';
import React, { useEffect, useState } from 'react'
import { GripVerticalIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@nextui-org/react';

interface DraggableItemProps {
    meal: MealType,
    mealrecipe: MealRecipeType
}

const DraggableItem:React.FC<DraggableItemProps> = ({meal, setmeal, mealrecipe}) => {

    const eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };
    
    return (
        <Draggable axis='y' onTouchEnd={eventLogger} scale={1}>
            <li className='flex flex-row justify-start gap-2 py-3 px-4 rounded-md bg-slate-800'>
                <GripVerticalIcon />
                <p>{mealrecipe.recipe.title}</p>
                <Button className="flex items-center text-red-500 ml-auto" onPress={setmeal}>
                    <Trash2Icon size={20} />
                </Button>
            </li>
        </Draggable>
    )
}
 
export default DraggableItem;