"use client"
import { formatDate } from '@/lib/utils';
import CommentBlog from '@/components/CommentBlog'
import Tag from '@/components/Tag'
import React, { useEffect, useState } from 'react'
import { MessageSquareMoreIcon, NotebookIcon } from 'lucide-react';
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';

const ArticleDetailPage = ({params} : {params : {articleId: string}}) => {

    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await fetch(`/api/article/${params.articleId}`)
            const data : ArticleWithTagsAndComments = await response.json()
            setArticle(data)
        }
        fetchArticle()
    }, [params.articleId])

    const handleCommentSubmit = async(event: React.FormEvent) => {
        event.preventDefault()

        try {
            const response = await fetch(`/api/article/${params.articleId}/comments`, {
                method: 'POST',
                body: JSON.stringify(data),
            })

            if(response.status === 200) {
                const updatedComments = await response.json()
                console.log(updatedComments);
                setArticle(prev => prev ? { ...prev, comments: updatedComments} : null)
            } else {
                console.error("Error post comment")
            }
        } catch(error) {
            console.error("Error submitting comment", error);
        }
    }
    
    const handleChange = (e:any) => {
        setData((prevData) => ({...prevData, [e.target.name]:e.target.value}))
    }

    return (
        <div className='mx-32'>
            {article &&
                (
                <div>
                    <ThemeSwitcherScroll/>
                    <section className='flex flex-col items-center w-full py-36 rounded-lg bg-slate-100 bg-opacity-10'>
                        <div className='my-5 flex flex-wrap'>
                            {article?.tags.map((tagArticle: TagArticleType) => (
                                <Tag key={tagArticle.tag.id} text={tagArticle.tag.name}/>
                            ))}
                        </div>
                        <h1 className='mb-3 text-4xl'>{article?.title}</h1>
                        <div>

                        <p className='text-sm text-slate-300 my-2'>{formatDate(article.createdAt)}</p>
                        </div>
                    </section>
                    <section className='px-16 py-4'>
                        <h2 className='flex flex-row gap-2 text-orange-600 my-5'><NotebookIcon/> Introduction</h2>
                        <p>{article?.text}</p>
                    </section>
                    <section className='px-16 py-4 mt-8 bg-slate-900 rounded-md'>
                        <h2 className='flex flex-row gap-3 mb-4 text-xl text-orange-500'><MessageSquareMoreIcon/> Comments ({article?.comments.length}) :</h2>
                        <ul>
                            {article?.comments && article.comments.length > 0 ? (
                                article?.comments.map((comment: CommentType) => (
                                    <CommentBlog key={comment.id} comment={comment} article={article} />
                                ))
                            ) : (
                                <p>
                                    Aucun commentaire ajouté sur cet article.
                                </p>
                            )}
                        </ul>
                        <div className='my-10'>
                            <h2 className='flex flex-row gap-3 mb-4 text-xl text-orange-500'><MessageSquareMoreIcon/> Write a comment</h2>
                            <div className='my-6 py-6 px-14 bg-slate-800 rounded-lg'>
                                <form id="recipe-comment-form" hidden={false} className='flex flex-col gap-6' onSubmit={handleCommentSubmit}>
                                    <input className='bg-slate-700 py-2 px-3 rounded-md' type="text" name="text" placeholder='Write your comment here...' onChange={handleChange}/>
                                    <button className='bg-indigo-500 py-2 px-4 rounded-md w-fit mt-6' type="submit">Submit</button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
                )
            }
            
        </div>
    )
}

export default ArticleDetailPage