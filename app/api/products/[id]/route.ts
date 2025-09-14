import { NextRequest } from "next/server";
import { connectToDb } from "@/app/api/db";

export const dynamic = 'force-dynamic';

type Params = {
    id: string;
}

export async function GET(request: NextRequest, { params } : { params: Params }) {
    const productId = params.id;

    const { db } = await connectToDb();
    const products = await db.collection('products').find({}).toArray();

    // Method 1:
    const product = products.find(p => p.id == productId);

    // Method 2:
    // const productMap = new Map(products.map(p => [p.id, p]));
    // const product = productMap.get(productId);

    if (!product) {
        return new Response(
            'Product not found!', {
                status: 404,
            }
        )
    }

    return  new Response(
            JSON.stringify(product), { 
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                } 
            }
        );
}

