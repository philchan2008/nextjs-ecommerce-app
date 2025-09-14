export async function GET() {
    return new Response('Hello from a Next.js route handler - GET!', {
            status: 200,
        }
    );
}

export async function POST() {
    return new Response('Thank you for posting to this handle - POST!', {
            status: 200,
        }
    );
}