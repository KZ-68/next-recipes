import Draggable, {DraggableCore} from 'react-draggable';
import React from 'react'
import { GripVerticalIcon } from 'lucide-react';

interface DraggableItemProps {
    recipe: RecipeType
}

const DraggableItem:React.FC<DraggableItemProps> = ({recipe}) => {

    const handleDelete = async () => {

        try {
            const res = await fetch(`/api/recipe/${recipe.id}/delete`, {
                method: 'DELETE'
            })
            
            location.reload();
        } catch(error) {
            console.error("Error deleting comment")
        }
    }

    const eventHandler = (e, data) => {
        console.log('Event Type', e.type);
        console.log({e, data});
    }
    
    return (
        <Draggable axis='y' onTouchEnd={eventHandler}>
            <div>
            <GripVerticalIcon />
            <p>{recipe.title}</p>
            </div>
        </Draggable>
    )
}
 
export default DraggableItem;