import Link from 'next/link'
import Image from 'next/image';
import React from 'react'
import Category from './Category';
import { Trash2Icon } from 'lucide-react';

interface FavoritesListProps {
    recipe: RecipeType
}

const FavoritesList:React.FC<FavoritesListProps>= ({recipe}) => {
    
    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this favorite ?')
        if(!confirmDelete) return;

        try {
            const res = await fetch(`/api/private/favorite/${recipe.id}/delete`, {
                method: 'POST'
            })
            if(res.ok) {
                location.reload();
            }
        } catch(error) {
            console.error(`Error while deleting favorite : ${error}`)
        }
    }

    return (
        <Link href={`recipe/${recipe?.id}`} key={recipe?.id}>
            <li key={recipe?.id}> 
                <p className='my-3 mx-4 text-xl'></p>
                <div className='flex flex-row items-center gap-6 py-8 px-6 my-4 ml-8 mr-20 rounded-md bg-slate-800'>
                    {recipe?.image_url == "" ? (
                        <Image className='rounded-md h-[200px]' src={`https://placehold.co/200x200/png?text=placeholder&font=roboto`} alt="Recipe Image" width="200" height="200"/>
                    ) : 
                    (
                        <Image className='rounded-md h-[200px]' src={`/images/${recipe?.image_url}`} alt="Recipe Image" width="200" height="200"/>
                    )}
                    <div className='flex flex-col'>
                        <h2 className='text-xl text-white my-4'>{recipe.title}</h2>
                        <Category text={recipe?.category?.name} key={recipe?.category?.id}/>
                    </div>
                    <button className="flex gap-2 px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-xs" onClick={handleDelete}><Trash2Icon size={15} />Delete</button>
                </div>
            </li>
        </Link>
    )
}

export default FavoritesList