"use server"
import { auth } from '@clerk/nextjs/server'

export async function articleFormAction(prevState: { success: boolean; message: string; } | Promise<{ success: boolean; message: string; } | null> | null, formData:FormData) {
    const { userId } = await auth()

    if (!userId) return { success: false, message: 'User not authentified'};

    prevState = null;
    
    const articleTitle = formData.get("title") as string;
    const articleText = formData.get("text") as string;
    const articleSlug = formData.get("slug") as string;
    const bodyForm = ({
        title: articleTitle,
        text: articleText,
        slug: articleSlug,
    })
    
    const response = await fetch(process.env.URL + `/api/article/new`, {
        method: 'POST',
        body: JSON.stringify({
            article : bodyForm
        }),
    })

    if(response.ok) {
        return {
            success: true,
            message: 'Article added successfully !',
        };
    } else {
        return {
            success: false,
            message: 'Error during the article creation process',
        };
    }
}