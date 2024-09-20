import React from 'react'

interface CategoryProps {
    text: string;
}

const Category:React.FC<CategoryProps> = ({text}) => {
  return (
    <div>
        <span className='group: px-3 py-2 text-xs rounded-md bg-green-800 duration-500'>
            {text}
        </span>
    </div>
  )
}

export default Category