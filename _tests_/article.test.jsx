/* eslint-disable @typescript-eslint/no-unused-vars */
import "@testing-library/jest-dom";
import React from 'react';
import { render } from "@testing-library/react";
import ArticlePage from "../app/article/page";
import ArticleCard from '@/components/ArticleCard'
 
jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

async function withFetch() {
    const res = await fetch('api/article')
    const json = await res.json()

    return json
}
  
describe('withFetch', () => {
    const realUseState = React.useState
    const stubInitialState = ['stub data']
      
    const unmockedFetch = global.fetch
    
    beforeAll(async() => {
        global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
    })
    
    afterAll(async() => {
        global.fetch = unmockedFetch
    })

    test('works', async () => {
        const { renderArticlePage } = render(<ArticlePage />);
        const json = await withFetch()

        const { articleCards } = render(<ArticleCard article={json}/>);
        expect(Array.isArray(json)).toEqual(true)
    })
})