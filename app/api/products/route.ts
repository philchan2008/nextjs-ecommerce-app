import { connectToDb } from "@/app/api/db";
import { NextRequest } from "next/server";

export async function GET() {
    const { db } = await connectToDb();
    const products = await db.collection('products').find({ id: {$gte: '456'} }).toArray();
    console.log('Products Length:', products.length);
    return new Response(JSON.stringify(products), { 
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            } 
        }
    );
}

export async function POST(request: NextRequest) {
    let body;

    try {
        body = await request.json();
    } catch {
        return new Response('Invalid JSON payload', { status: 400 });
    }

    const { name, imageUrl, description, price } = body;

    // Basic validation
    if (!name || typeof name !== 'string'
        || !imageUrl || typeof imageUrl !== 'string'
        || !description || typeof description !== 'string'
        || typeof price !== 'number') {
        return new Response('Missing or invalid fields', { status: 400 });
    }

    // Name and description long data checking
    if (name.length > 100 || description.length > 1000) {
        return new Response('Name or description too long.', { status: 400 });
    }

    // Positive price checking
    if (price < 0) {
        return new Response('Price should be positive number.', { status: 400 });
    }

    const { db } = await connectToDb();

    const products = db.collection('products');
    
    //Check for existing product by unique name
    const existing = await products
        .findOne({
            $or: [
                { name: name },
                { description: description },
                { imageUrl: imageUrl }
            ]
        });
    
    if (existing) {
        return new Response(JSON.stringify({
                error: 'Duplicate product name/description/imageUrl',
                existingProduct: existing
            }), {
                status: 409,
                headers: { 'Content-Type': 'application/json' }
             });
    }
    
    //Get the N+1 as the new ID
    const lastProductId = await products
        .find({})
        .sort({ id: -1 })
        .limit(1)
        .toArray();
    
    const nextId = lastProductId.length > 0 ? parseInt(lastProductId[0].id) + 1 : 1;

    const newProduct = {
        //id: crypto.randomUUID(), // or use MongoDB ObjectId if preferred
        id: nextId.toString(),
        name,
        imageUrl,
        description,
        price
    };

    
    await products.insertOne(newProduct);

    return new Response(JSON.stringify(newProduct), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    });
}