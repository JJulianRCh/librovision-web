"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('/api/auth/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            setMessage(data.message);

            if (res.ok) {
                router.push("/login");
            }
        } catch(error) {
            setMessage("Error al conectar con el servidor");
            console.log(error);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify center text-center">
            <section>
                <h1>Crea una cuenta</h1>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input 
                    className="input"
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    />
                    <br/>
                    <input
                    className="input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    />
                    <br/>
                    <input
                    className="input"
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    />
                    <br/>
                    <button className="btn btn-verde">Crear cuenta</button>
                </form>
                {message && <p className="mt-4">{message}</p>}
            </section>
        </main>
    );
}
