import { NextRequest } from "next/server";
import { connectToDb } from "@/app/api/db";

import { ObjectId } from "mongodb";

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

export async function PATCH(request: NextRequest, { params }: { params: Params }) {
    const productId = params.id;
    //const productId = new ObjectId(params.id);
    let body;
    try {
        body = await request.json();
    } catch (err) {
        return new Response('Invalid JSON payload', { status: 400 });
    }
    const { db } = await connectToDb();
    const result = await db.collection('products').updateOne(
        { id: productId },
        { $set: body }
    );

    if (result.matchedCount === 0) {
        return new Response('Product not found!', { status: 404 });
    }

    return new Response('Product updated successfully.', { status: 200 });
}


export async function DELETE(request: NextRequest, { params }: { params: Params }) {
    //const productId = params.id;
    const productId = new ObjectId(params.id);
    const { db } = await connectToDb();
    const result = await db.collection('products').deleteOne({ id: productId });

    if (result.deletedCount === 0) {
        return new Response('Product not found!', { status: 404 });
    }

    return new Response('Product deleted successfully.', { status: 200 });
}
