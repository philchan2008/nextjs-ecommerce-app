import { MongoClient, Db, ServerApiVersion } from 'mongodb';

// FIXME: Try switch to mongoose later.
// import { mongoose } from mongoose;

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function closeConnection() {
    if (cachedClient) {
        await cachedClient.close()
    }
}

export async function connectToDb() {
    if (cachedClient && cachedDb) {
        return {client: cachedClient, db: cachedDb};
    }


    // const uri = "mongodb+srv://<user></user>>:<password>@<hostname>/?retryWrites=true&w=majority&appName=pipc1";
    const uri = `${process.env.DB_URI}`; // $env:DB_URI=""mongodb+srv://<user></user>>:<password>@<hostname>/?retryWrites=true&w=majority&appName=pipc1""
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
    } catch (err) {
        console.error('Mongodb connection error:', err);
        throw err;
    }
    cachedClient = client;
    cachedDb = client.db('demo');

    return { client, db: client.db('demo') }
}