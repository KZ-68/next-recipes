import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { menuId: string } }) {
    try {
        const { menuId } = params;

        // Check if the menu exists
        const menu = await db.menu.findUnique({
            where: {
                id: menuId
            }
        });

        if (!menu) {
            return new NextResponse('Menu Not Found', { status: 404 });
        }

        // Delete the menu
        await db.menu.delete({
            where: {
                id: menuId
            }
        });

        return new NextResponse('Menu deleted successfully', { status: 200 });
    } catch (error) {
        console.error("[Menu]", error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}