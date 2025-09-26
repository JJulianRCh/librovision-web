import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

function limpiarHTML(texto) {
  if (!texto) return '';
  return texto
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#47;');
}

export async function POST(req) {
    try {
        const token = req.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({
                message: "No autorizado - Sin token",
                status: 401
            });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Usuario autorizado:", decoded.username);
        } catch (err) {
            return NextResponse.json({
                message: "Token inválido",
                status: 401
            });
        }

        const body = await req.json();
        const {title, author, review, rank, userId} = body;

        if (!title || title.length < 2) {
            return NextResponse.json({message: "Titulo invalido"});
        }

        if (!review || review.length < 10) {
            return NextResponse.json({message: "Reseña corta"});
        }

        // Convertir rank a número
        const rankNumber = parseInt(rank);
        
        if (isNaN(rankNumber) || rankNumber < 0 || rankNumber > 5) {
            return NextResponse.json({message: "Puntuación invalida"});
        }

        // Limpiar todos los campos de texto
        const cleanTitle = limpiarHTML(title);
        const cleanAuthor = limpiarHTML(author);
        const cleanReview = limpiarHTML(review);

        const client = (await clientPromise).db();
        const bookreviews = client.collection("bookreviews");

        const resultado = await bookreviews.insertOne({
            title: cleanTitle,
            author: cleanAuthor,
            review: cleanReview,
            rank: rankNumber,
            userId: userId
        });

        return NextResponse.json({
            message: "Review Publicada",
            status: 200,
            insertedId: resultado.insertedId
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({
            message: "Error al guardar",
            error: error.toString(),
            status: 500
        });
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
            const cleanSearchTitle = limpiarHTML(title);
            query.title = { $regex: new RegExp(cleanSearchTitle, "i") };
        }
        if (userId) {
            query.userId = userId;
        }

        const result = await reviews.find(query).toArray();

        return NextResponse.json({
            reviews: result
        });
    } catch (error) {
        return NextResponse.json({
            message: "Error al obtener reseñas",
            error: error.toString(),
            status: 500
        });
    }
}

// DELETE - Borrar reseñas (SOLO ADMIN)
export async function DELETE(req) {
    try {
        const token = req.cookies.get('token')?.value;
        
        if (!token) {
            return NextResponse.json({
                message: "No autorizado",
                status: 401
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return NextResponse.json({
                message: "Token inválido",
                status: 401
            });
        }
        
        // VERIFICAR SI ES ADMIN
        if (decoded.role !== 'admin') {
            return NextResponse.json({
                message: "Solo administradores pueden borrar",
                status: 403
            });
        }

        const { searchParams } = new URL(req.url);
        const reviewId = searchParams.get("id");
        
        const client = (await clientPromise).db();

        if (!reviewId) {
            // Si no hay ID, borrar TODAS las reseñas
            const result = await client.collection("bookreviews").deleteMany({});
            console.log("Todas las reseñas eliminadas:", result.deletedCount);
            
            return NextResponse.json({
                message: `Se eliminaron ${result.deletedCount} reseñas`,
                deletedCount: result.deletedCount,
                status: 200
            });
        }

        // Borrar reseña específica
        const result = await client.collection("bookreviews").deleteOne({
            _id: new ObjectId(reviewId)
        });

        console.log("Reseña eliminada:", reviewId);

        return NextResponse.json({
            message: "Reseña eliminada",
            deletedCount: result.deletedCount,
            status: 200
        });
    } catch (error) {
        console.error("Error al borrar:", error);
        return NextResponse.json({
            message: "Error al borrar",
            error: error.toString(),
            status: 500
        });
    }
}