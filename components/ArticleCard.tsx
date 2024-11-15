import React from 'react'
import { formatDate } from '@/lib/utils'
import Tag from './Tag'
import { useRouter } from 'next/navigation';
import { Trash2Icon } from 'lucide-react';
import Link from 'next/link'

interface ArticleCardProps {
    article: ArticleWithTagsAndComments;
}

const ArticleCard:React.FC<ArticleCardProps> = ({article}) => {

    const router = useRouter();

    const handleDelete = async () => {

        const confirmDelete = window.confirm('Are you sure you want to delete this article ?')
        if(!confirmDelete) return;

        try {
            const res = await fetch(`/api/article/${article.id}/delete`, {
                method: 'DELETE'
            })

            router.push('/article')
        } catch(error) {
            console.error("Error deleting article")
        }
    }

    return (
        <div className='group border border-slate-500 p-6 rounded-md cursor-pointer hover:translate-y-2 duration-300 md:h-full' key={article.id}>
            {/* Titre de l'article */}
            <h2 className='text-2xl md:text-xl font-bold'>{article.title}</h2>
            <p className='text-sm text-slate-300 my-2'>{formatDate(article.createdAt)}</p>
            <div className='flex flex-wrap gap-2 my-3 md:leading-8'>
                {article.tags.map((tagArticle:TagArticleType)=> (
                    <Tag text={tagArticle.tag.name} key={tagArticle.tag.id}/>
                ))}
            </div>
            
            {/* Texte de l'article */}
            <p className='line-clamp-4 py-1 my-4 text-sm'>{article.text}</p>

            <div className='my-6'>
                <Link className='text-orange-600' href="https://google.fr">Read more...</Link>
            </div>
            <div className='sm:top-5 sm:right-5 my-4'>
                <button className="flex gap-2 px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-xs" 
                onClick={handleDelete}><Trash2Icon size={15} />Delete</button>
            </div>
        </div>
    )
}

export default ArticleCard