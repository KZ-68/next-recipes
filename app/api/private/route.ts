import { NextRequest, NextResponse } from 'next/server'
import { clerkClient, currentUser } from '@clerk/nextjs/server'

export async function POST(req:NextRequest) {
    const user = await currentUser()
    const userId = user.id;
    const body = await req.json()
    await clerkClient.users.updateUserMetadata(userId, {
    privateMetadata: {
      favoriteRecipes: body.recipe,
    },
  })
  return NextResponse.json({ success: true })
}

export async function GET() {
    const currentUserData = await currentUser()
    const userId = currentUserData.id;

    const user = await clerkClient.users.getUser(userId)
    return NextResponse.json(user.privateMetadata)
}