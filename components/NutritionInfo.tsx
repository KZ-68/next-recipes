import { AppleIcon, CandyIcon, CitrusIcon, DropletIcon, Drumstick, WheatIcon } from 'lucide-react'
import React from 'react'

interface NutritionInfoProps {
    energyLabel: string
    energyQuantity: string
    energyUnit: string
    totalFatLabel: string
    totalFatQuantity: string
    totalFatUnit: string
    carbohydrateLabel: string
    carbohydrateQuantity: string
    carbohydrateUnit: string
    protLabel: string
    protQuantity: string
    protUnit: string
    sugarLabel: string
    sugarQuantity: string
    sugarUnit: string
    vitcLabel: string
    vitcQuantity: string
    vitcUnit: string
}

const NutritionInfo:React.FC<NutritionInfoProps> = (
    {
        energyLabel, 
        energyQuantity, 
        energyUnit, 
        totalFatLabel, 
        totalFatQuantity, 
        totalFatUnit,
        carbohydrateLabel,
        carbohydrateQuantity,
        carbohydrateUnit,
        protLabel,
        protQuantity,
        protUnit,
        sugarLabel,
        sugarQuantity,
        sugarUnit,
        vitcLabel,
        vitcQuantity,
        vitcUnit
    }
) => {

    return (
        <div className='flex flex-row flex-wrap justify-center gap-2 py-4 px-2 rounded-md'>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <AppleIcon className='p-2 rounded-full bg-green-700' size={48} strokeWidth={1}/>
                <h3>{energyLabel}</h3>
                <p className='flex flex-row gap-3'>{energyQuantity}{energyUnit}</p>
            </div>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <Drumstick className='p-2 rounded-full bg-blue-700' size={48} strokeWidth={1}/>
                <h3>{protLabel}</h3>
                <p className='flex flex-row gap-3'>{protQuantity}{protUnit}</p>
            </div>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <WheatIcon className='p-2 rounded-full bg-yellow-800' size={48} strokeWidth={1}/>
                <h3>{carbohydrateLabel}</h3>
                <p className='flex flex-row gap-3'>{carbohydrateQuantity}{carbohydrateUnit}</p>
            </div>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <DropletIcon className='p-2 rounded-full bg-red-800' size={48} strokeWidth={1}/>
                <h3>{totalFatLabel}</h3>
                <p className='flex flex-row gap-3'>{totalFatQuantity}{totalFatUnit}</p>
            </div>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <CandyIcon className='p-2 rounded-full bg-pink-800' size={48} strokeWidth={1}/>
                <h3>{sugarLabel}</h3>
                <p className='flex flex-row gap-3'>{sugarQuantity}{sugarUnit}</p>
            </div>
            <div className='flex flex-col items-center py-8 px-14 rounded-md bg-slate-900 w-[32%]'>
                <CitrusIcon className='p-2 rounded-full bg-orange-800' size={48} strokeWidth={1}/>
                <h3>{vitcLabel}</h3>
                <p className='flex flex-row gap-3'>{vitcQuantity}{vitcUnit}</p>
            </div>
        </div>
    )
}

export default NutritionInfo