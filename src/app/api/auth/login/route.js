import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function POST(req) {
    

    const { identifier, password } = await req.json();

    if (!identifier || !password) {
        return NextResponse.json({
            message: "Faltan Campos",
            status: 400
        });
    }

    const client = (await clientPromise).db();
    const user = await client.collection("users").findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) return NextResponse.json({
        message: "El usuario no existe",
        status: 404
    })

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) return NextResponse.json({
        message: "Contraseña incorrecta",
        status: 401
    });

    const token = jwt.sign(
        {
            username: user.username,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    return NextResponse.json({
        message: "Inicio de sesion exitoso",
        status: 200
    });
}
