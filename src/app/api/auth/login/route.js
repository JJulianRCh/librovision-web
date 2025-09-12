import { NextResponse } from "next/server";
import clientPromise from "@/utils/dbconect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
    if (!req.method !== "POST") return res.status(405).end();

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Faltan Campos" });
    }

    const client = (await clientPromise).db();
    const user = await client.collection("users").findOne({
        $or: [{ username: identifier }, { email: identifier }]
    });

    if (!user) return NextResponse.json({
        message: "El usario no existe",
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
