import { NextResponse } from 'next/server';
import clientPromise from '@/utils/dbconect';
import bcrypt from 'bcrypt';

export async function POST(req) {
    

    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
        return NextResponse.json({
            message: "Campos vacios",
            status: 400
        });
    }

    if (username < 3 || username > 20) {
        return NextResponse.json({message: "Nombre invalido", status: 400});
    }

    const emailREXP = "/^[^\s@]+@[^s@]+\.[^\s@]+$/";
    if (!email.test(email)) {
        return NextResponse.json({message: "Correo invalido", status: 400});
    }

    if (password < 8) {
        return NextResponse.json({message: "Contraseña corta", status: 400});
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
