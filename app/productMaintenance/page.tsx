import ProductsMasterList from '../ProductsMasterList';

export const dynamic = 'force-dynamic';

export default async function ProductsMaintenancePage() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`);
    const products = await response.json();

    return (
        <div className='container mx-auto p-8'>
            <h1 className='text-4xl font-bold mb-8'>Product Master</h1>
            <ProductsMasterList products={products} />
        </div>
    )
}