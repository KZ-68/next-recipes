import { formatDate } from '@/lib/utils';
import { Trash2Icon } from 'lucide-react';
import React from 'react'

interface CommentProps {
    comment: CommentType;
    recipe: RecipeType;
}

const Comment:React.FC<CommentProps> = ({comment, recipe}) => {

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this comment ?')
        if(!confirmDelete) return;

        try {
            const res = await fetch(`/api/comment-recipe/${comment.id}/delete`, {
                method: 'DELETE'
            })

            location.reload();
        } catch(error) {
            console.error("Error deleting comment")
        }
    }

    return (
        <li key={comment.id} className='flex-row m-5 group border border-slate-500 p-6 rounded-sm'>
            <div className='flex flex-col gap-1'>
                <p className='text-sm text-slate-300'>{formatDate(recipe.createdAt)}</p>
                <p>{comment.text}</p>
            </div>
            <div className='sm:top-5 sm:right-5 my-4'>
                <button className="flex gap-2 px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-xs" 
                onClick={handleDelete}><Trash2Icon size={15} />Delete</button>
            </div>
        </li>
    )
}

export default Comment