"use client"
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
        <div>
            <h1 className='mb-3 text-2xl'>{article?.title}</h1>
            <p>{article?.text}</p>
            <div className='my-5 flex flex-wrap'>
                {article?.tags.map((tagArticle: TagArticleType) => (
                    <Tag key={tagArticle.tag.id} text={tagArticle.tag.name}/>
                ))}
            </div>
            <div className='p-4 mt-8 bg-slate-900 rounded-md'>
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
            </div>
        </div>
    )
}

export default ArticleDetailPage