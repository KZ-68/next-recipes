"use client"
// import { db } from '@/lib/db'
// import { formatDate } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import ThemeSwitcherScroll from '@/components/ThemeSwitcherScroll'
import { useUser } from '@clerk/nextjs';
import Button from '@/components/Button'

const ArticlePage = () => {

    // VERSION 1
    // const articles = await db.article.findMany({
    //     "orderBy": {
    //         "createdAt": 'desc'
    //     },
    //     "include":{
    //         "tags":{
    //             "include":{
    //                 "tag":true
    //             }
    //         }
    //     }
    // })
    
    // VERSION 2 - HOOKS
    const [articles, setArticles] = useState<ArticleWithTagsAndComments[]>([])
    const {isSignedIn} = useUser();

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await fetch('/api/article')
            const data : ArticleWithTagsAndComments[] = await response.json()
            setArticles(data)
        }
        fetchArticles()
    }, [])

    return (
        <>
            <ThemeSwitcherScroll/>
            <nav>
                <Button href='https://elan-formation.fr/accueil' label='Return'/>
                {isSignedIn ? 
                    <Button href='/article/new' label='Add a new article'/>
                :  ("")
                }
            </nav>
            <h1 className='text-4xl font-bold mt-8 mb-6'>Blog</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {/* Liste des articles */}
                {articles.length > 0 ? 
                (
                    articles.map((article: ArticleWithTagsAndComments) => (
                        <Link href={`article/${article.id}`} key={article.id}>
                            <ArticleCard article={article}/>
                        </Link>
                    ))
                ):
                (
                    <p>Articles list is empty for now</p>
                )}
                
            </div>
        </>
    )
}

export default ArticlePage
