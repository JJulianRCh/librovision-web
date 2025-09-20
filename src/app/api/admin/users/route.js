import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";

export async function GET(req) {
    try {
        const client = (await clientPromise).db();
        const users = await client.collection("users").find().toArray();
        return NextResponse.json({users: users});
    } catch(error) {
        return NextResponse.json({
            message: "Error al conseguir los usuarios",
            status: 500
        });
    }
}