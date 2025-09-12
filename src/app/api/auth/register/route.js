import { NextResponse } from 'next/server';
import clientPromise from '@/utils/dbconect';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (!req.method !== "POST") return res.status(405).end();

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return NextResponse.json({
            message: "Campos vacios",
            status: 400
        });
    }

    const client = (await clientPromise).db();
    const users = client.collection("users");

    const exists = await users.findOne({ username });
    if (exists) {
        return NextResponse.json({
            message: "El usuario ya existe",
            status: 400
        });
    }

    const hashPwd = await bcrypt.hash(password, 10);

    await users.insertOne({
        username: username,
        email: email,
        password: hashPwd,
        role: "user"
    });

    return NextResponse.json({
        message: "Usuario registrado con exito",
        status: 201
    });
}
