"use client"
// import { db } from '@/lib/db'
// import { formatDate } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import Button from '@/components/Button'
import Link from 'next/link'


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
            <Button href='https://elan-formation.fr/accueil' label='Retour'/>
            <h1 className='text-4xl font-bold mt-4 mb-6'>Blog</h1>
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
