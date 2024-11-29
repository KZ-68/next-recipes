import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import React, { useRef, useState } from 'react'
import { GripVerticalIcon } from 'lucide-react';

interface DraggableItemProps {
    meal: MealType
    recipes: RecipeType[]
    recipe: RecipeType
    setMeal: React.Dispatch<React.SetStateAction<MealType | null>>
}

const DraggableItem:React.FC<DraggableItemProps> = ({meal, recipes, recipe, setMeal}) => {

    const nodeRef = useRef(null);
    const dragAreaRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const itemHeight = 50;
    const listHeight = recipes.length * itemHeight;
    const listWidth = 400;
    const itemWidth = 390;

    const maxY = listHeight - itemHeight;
    const maxX = listWidth - itemWidth;

    const handleDrag = (e:DraggableEvent, data:DraggableData) => {
        const clampedX = Math.min(Math.max(data.x, 0), maxX);
        const clampedY = Math.min(Math.max(data.y, 0), maxY);
        setPosition({ x: clampedX, y: clampedY });
    };
    
    return (
        <div ref={dragAreaRef}>
            <Draggable scale={1}
                axis='y'
                position={position}
                onDrag={handleDrag}
            >
                <li ref={nodeRef} draggable={true} className='flex flex-row justify-start gap-2 py-3 px-4 rounded-md bg-slate-800'>
                    <GripVerticalIcon className='cursor-pointer' />
                    <p>{recipe.title}</p>    
                </li>
            </Draggable>
        </div>
    )
}
 
export default DraggableItem;