export default async function FeatchTest() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/hello`);
    const data = await response.json();
    
    return (
        <>
            <h1>{data.message}</h1>
        </>
    )
}
