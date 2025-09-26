import { GET } from '@/app/api/products/route';

test('GET returns product list', async () => {
  const response = await GET();
  expect(response.status).toBe(200);

  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
  expect(data[0].name).toBe('Apron');
});


