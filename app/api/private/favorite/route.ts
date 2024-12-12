import { NextResponse } from 'next/server'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

export async function GET() {
    const currentUserData = await currentUser()
    if(currentUserData === null) {
        return NextResponse.json({ success: false })
    } else {
        const userId = currentUserData.id;
        const user = await clerkClient.users.getUser(userId)
        return NextResponse.json(user.privateMetadata)
    }
}