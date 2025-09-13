import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";
import { ObjectId } from "mongodb";

export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        const client = (await clientPromise).db();
        await client.collection("users").deleteOne({_id: new ObjectId(id)});
        return NextResponse.json({
            message: "Se elimino el usuario",
        });
    } catch(error) {
        return NextResponse.json({
            message: "No se pudo eliminar",
            status: 500
        });
    }
}
