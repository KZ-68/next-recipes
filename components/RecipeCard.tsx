import React from 'react'
import { Gauge, HeartPulse, ImageIcon, LeafIcon, TimerIcon } from 'lucide-react';
import Category from './Category';
import Image from 'next/image';
import Link from 'next/link';

interface RecipeCardProps {
    recipe: RecipeType;
    category: CategoryType;
}

const RecipeCard:React.FC<RecipeCardProps> = ({recipe, category}) => {

    const rating = recipe.rating;

    const getGaugeIcon = () => {
        const gaugeArray = [];
        for (let id = 0; id < 5; id++) {
          if(id <= rating) {
            gaugeArray.push(<Gauge color={category.name === 'Dessert' ? '#6dc96a' : category.name === 'Main' ? '#e06020' : '#e06020'} key={id}></Gauge>);
          } else {
            gaugeArray.push(<Gauge color='white' key={id}></Gauge>);
          }
        }
        return gaugeArray;
    };

    const getVeganAndHealthyStatus = () => {
        const status = [];
        if(recipe.vegan === true) {
            status.push(<LeafIcon key={recipe.id} fill='#3f8f29' color='black' strokeWidth={1} size={24}/>)
        }
        if(recipe.healthy === true) {
            status.push(<HeartPulse key={recipe.id} fill='#de1a24' color='black' strokeWidth={1} size={24}/>)
        }
        return status
    }

    return (
        <div className='flex flex-col w-72 group rounded-lg bg-slate-800 cursor-pointer duration-300 h-full' key={recipe.id}>
            <div className='relative flex flex-row rounded-xl justify-center bg-slate-800'>
                {recipe.image_url == "" ? (
                    <ImageIcon className='text-white' size={250}/>
                ) : 
                (
                <Image className='rounded-t-lg w-[320px] h-[250px]' src={`/images/${recipe.image_url}`} alt="Recipe Image" width="250" height="250"/>
                )}
                <div className='bg-slate-100 bg-opacity-95 rounded-3xl w-fit py-2 px-3 absolute top-2 right-2'>
                    {getVeganAndHealthyStatus()}
                </div>
                
            </div>
            
            <div className='flex flex-col rounded-b-lg items-start px-5 py-4 bg-slate-800'>
                <h2 className='text-2xl md:text-xl font-bold text-white'>{recipe.title}</h2>
                
                <div className='flex flex-wrap gap-2 my-4 md:leading-8 text-white'>
                <Category text={category.name} key={category.id}/>
                </div>
                
                <p className='flex flex-row gap-1 my-2 line-clamp-4 text-white'><TimerIcon/> {recipe.duration} mins</p>

                <div className='flex flex-row'>
                    {getGaugeIcon()}
                </div>
                
                <Link className='my-6 py-2 px-4 border-2 text-white rounded-md' href={`recipe/${recipe.id}`} key={recipe.id} >View Recipe {'->'}</Link>

            </div>
        </div>
    )
}

export default RecipeCard