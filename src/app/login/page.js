"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        identifier: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Contend-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.ok) {
                router.push("/dashboard");
            } else {
                setError(data.message);
            }
        } catch(error) {
            //
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify center text-center">
            <section>
                <h1>Inicio de sesión</h1>
                <form onSubmit={handleSubmit}>
                    <input
                    className="input"
                    name="identifier"
                    type="identifier"
                    placeholder="Nombre de usuario o email"
                    value={formData.identifier}
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
                    <button className="btn btn-azul" type="submit">Entrar</button>
                </form>
            </section>
        </main>
    );
}
