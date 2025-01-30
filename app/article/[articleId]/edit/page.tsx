"use client"
import React, { useEffect, useState } from 'react'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll';
import { CheckCircle2, XCircleIcon } from 'lucide-react';
import { articleFormAction } from "@/components/newArticleForm";
import { useFormState } from 'react-dom';

const EditArticle = ({params} : {params : {articleId: string}}) => {
    const [article, setArticle] = useState<ArticleWithTagsAndComments | null>(null)
    const [formState, formAction] = useFormState(articleFormAction, null);

    useEffect(() => {
        const fetchArticle = async () => {
            const response = await fetch(`/api/article/${params.articleId}`)
            const data : ArticleWithTagsAndComments = await response.json()
            setArticle(data)
        }
        fetchArticle()
    }, [params.articleId])

    
    return (
    <>
        <ThemeSwitcherScroll/>
        {formState?.success === true && (
            <p id="success" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><CheckCircle2 className='flex flex-row gap-2 text-white bg-green-700 rounded-full'/>{formState?.message}</p>
        )}
        {formState?.success === false && (
            <p id="error" className='bg-white w-fit py-2 px-3 my-3 text-black rounded-md'><XCircleIcon className='text-white bg-red-600 rounded-full'/>{formState?.message}</p>
        )}
        <h1 className='text-2xl my-3 text-white'>New Article</h1>
        <p className='text-white'>With this form, you can add a new article</p>
        <div className='flex flex-col my-6 py-8 px-6 mx-80 rounded-lg bg-slate-800'>
            <form className='flex flex-col gap-6 py-8 px-6 rounded-2xl' action={formAction} id="signup-form">
                <label className='text-white text-2xl' htmlFor="title">Title : </label>
                <input className='py-3 px-2 rounded-lg' type='text' name="article-title" id="article-title" value={article?.title} />
                <label className='text-white text-2xl' htmlFor="text">Text : </label>
                <input className='py-3 px-2 rounded-lg' type='text' name="article-text" id="article-text" value={article?.text} />
                <label className='text-white text-2xl' htmlFor="title">Slug : </label>
                <input className='py-3 px-2 rounded-lg' type='text' name="article-slug" id="article-slug" value={article?.slug} />
                <button className='py-2 px-2 rounded-lg bg-indigo-500 text-white' type='submit'>Add</button>
            </form>
        </div>
        
    </>
    );
}

export default EditArticle