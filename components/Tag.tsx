import React from 'react'

interface TagProps {
    text: string;
}

const Tag:React.FC<TagProps> = ({text}) => {
  return (
    <div>
        <span className='group: px-3 py-2 text-xs rounded-full bg-rose-500 group-hover:bg-pink-600 duration-500'>
            {text}
        </span>
    </div>
  )
}

export default Tag