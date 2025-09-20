import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";

//POST-publicar resena
export async function POST(req) {
    try {
        const {title, author, review, rank, userId} = await req.json();

        const client = (await clientPromise).db();
        const bookreviews = client.collection("bookreviews")

        await bookreviews.insertOne({
            title: title,
            author: author,
            review: review,
            rank: rank,
            userId: userId
        });
        return NextResponse.json({
            message: "Review Publicada",
            status: 200
        });
    } catch (error) {
        return NextResponse.json({});
    }
}

//GET-enlistar resenas
export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const title = searchParams.get("title");
        const userId = searchParams.get("userId");
        
        const client = (await clientPromise).db();
        const reviews = client.collection("bookreviews");

        let query = {};
        if (title) {
            query.title = { $regex: new RegExp(title, "i") };
        }
        if (userId) {
            query.userId = userId;
        }

        const result = await reviews.find(query).toArray();

        return NextResponse.json({
            reviews: reviews,
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            message: error,
            status: 500
        });
    }
}
