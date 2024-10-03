"use client"
import { formatDate } from '@/lib/utils';
import CommentBlog from '@/components/CommentBlog'
import Tag from '@/components/Tag'
import React, { useEffect, useState } from 'react'

const ArticleDetailPage = ({params} : {params : {articleId: string}}) => {

    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await fetch(`/api/article/${params.articleId}`)
            const data : ArticleWithTagsAndComments = await response.json()
            setArticle(data)
        }
        fetchArticle()
    }, [params.articleId])

    return (
        <div className='mx-10'>
            <section className='flex flex-col items-center w-full py-36 rounded-lg bg-slate-100 bg-opacity-10'>
                <div className='my-5 flex flex-wrap'>
                    {article?.tags.map((tagArticle: TagArticleType) => (
                        <Tag key={tagArticle.tag.id} text={tagArticle.tag.name}/>
                    ))}
                </div>
                <h1 className='mb-3 text-5xl'>{article?.title}</h1>
            </section>
            <section className='px-32 py-4'>
                <h2>Introduction</h2>
                <p>{article?.text}</p>
            </section>
            <section className='py-4 px-32 mt-8 bg-slate-900 rounded-md'>
                <h2 className='mb-4 text-xl'>Les commentaires ({article?.comments.length}) :</h2>
                <ul>
                    {article?.comments && article.comments.length > 0 ? (
                        article?.comments.map((comment: any) => (
                            <CommentBlog key={comment.id} comment={comment} article={article} />
                        ))
                    ) : (
                        <p>
                            Aucun commentaire ajouté sur cet article.
                            
                        </p>
                    )}
                </ul>
            </section>
        </div>
    )
}

export default ArticleDetailPage