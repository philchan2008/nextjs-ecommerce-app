import { GET } from '@/app/api/products/route';
import { POST } from '@/app/api/products/route';
import { closeConnection, connectToDb } from '@/app/api/db';
import { NextRequest } from 'next/server';

type Product = {
  name: string;
  imageUrl: string,
  description: string,
  price: number,
  [key: string]: string | number; // ✅ Allows dynamic access
}

let mockProduct : (keyof Product)[] = ['name', 'imageUrl', 'description', 'price'];

const requiredFields = [
  { field: "name", value: "", errMsg: "Missing or invalid fields", statusCode: 400 },
  { field: "imageUrl", value: "", errMsg: "Missing or invalid fields", statusCode: 400},
  { field: "description", value: "", errMsg: "Missing or invalid fields", statusCode: 400 },
  { field: "price", value: -1, errMsg: "Price should be positive number.", statusCode: 400 },
]

let apiUrl: string;

describe('Products API Test', () => {
  beforeAll(() => {
    mockProduct = {
      name: 'Test Product',
      imageUrl: 'http://localhost/1.jpg',
      description: 'Test Product Description',
      price: 999.99
    };
    apiUrl = 'http://localhost/api/products';
  });

  test('Get product list', async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0].name).toBe('Apron');
  });

  describe('POST product validation', () => {
    requiredFields.forEach(({ field, value, errMsg, statusCode }) => {
      test(`fails when ${field} is invalid`, async () => {
        const product = { ...mockProduct };
        //const field: keyof Product = field; //FIXME: It can't fix the typescript type safe error
        product[field] = value;
        const mockRequest = new NextRequest(apiUrl, {
          method: 'POST',
          body: JSON.stringify(product),
          headers: { 'Content-Type': 'application/json' }
        });
        const response = await POST(mockRequest);
        expect(response.status).toBe(statusCode);

        const data = await response.json();
        expect(data.error).toBe(errMsg);
      });
    });
  });
  
  test('POST creates a product', async () => {
    const mockRequest = new NextRequest(apiUrl, {
      method: 'POST',
      body: JSON.stringify(mockProduct),
      headers: { 'Content-Type': 'application/json' }
    });

    const response = await POST(mockRequest);
    expect(response.status).toBe(201);

    const data = await response.json();
    expect(data.name).toBe(mockProduct.name);
    expect(data.id).toBeDefined();

  });

  afterAll(async () => {
    // ✅ Clean up test data
    const { db } = await connectToDb();
    await db.collection('products').deleteOne({ name: mockProduct.name });
    await closeConnection(); // ✅ Clean up DB connection
  });

})


//afterAll(() => {
  //BUG: FIXME: A worker process has failed to exit gracefully and has been force exited. This is likely caused by tests leaking due to improper teardown. Try running with --detectOpenHandles to find leaks. Active timers can also cause this, ensure that .unref() was called on them.
//  console.log(process._getActiveHandles());
//});
