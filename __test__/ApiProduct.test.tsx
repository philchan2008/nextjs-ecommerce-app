import { GET } from '@/app/api/products/[id]/route';
import { NextRequest } from 'next/server';
import { closeConnection } from '@/app/api/db';


describe('Product[Id] API Test', () => {
  test('Get product list', async () => {
    const mockRequest = new Request('http://localhost/api/products/123');
    const mockParams = { params: { id: '123' } };

    const response = await GET(mockRequest as NextRequest, mockParams);
    expect(response.status).toBe(200);

    const data = await response.json();
      expect(data).toEqual({
        "_id": "68c2d59ee2f5939594773f82",
        "description": "Cheer the team on in style with our unstructured, low crown, six-panel baseball cap made of 100% organic cotton twill. Featuring our original Big Star Collectibles artwork, screen-printed with PVC- and phthalate-free inks. Complete with matching sewn ventilation eyelets, and adjustable fabric closure.",
        "id": "123",
        "imageUrl": "hat.jpg",
        "name": "Hat",
        "price": "99.99",
      });
  });
})

afterAll(async () => {
  await closeConnection(); // ✅ Clean up DB connection
});


