import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const options = {};

if (!MONGODB_URI) {
    console.log("Error de conexion");
    return;
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    console.log("Conectado");
    global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
