Demo site see https://pipc-ecommerce.vercel.app/

The MongoDB instance is not persistently exposed to the public network, and external access may require manual activation when needed.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

## Deploy on Vercel

Demo site see https://pipc-ecommerce.vercel.app/

## Prepare Environment Variable
Edit .env file, set the DB_URI mongodb connection string.
```
DBURL=mongodb+srv://<db_username>:<db_password>@pipc1.cwt06st.mongodb.net/?retryWrites=true&w=majority&appName=pipc1
```