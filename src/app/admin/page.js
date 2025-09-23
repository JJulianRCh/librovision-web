"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const router = useRouter();

    const [users, setUsers] = useState([]);

    const [message, setMessage] = useState("");

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/admin/users");
                const data = await res.json();
                
                if (res.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
                setMessage("Ocurrio un error, No se encrontaron usuarios");
                console.log(error);
            }
        }
        fetchUsers();
    }, []);


    const handleDelete = async (id) => {
        if (!confirm("Seguro de eliminar a este usuario")) return;
        try {
            await fetch(`/api/admin/users/${id}`, 
                {method: "DELETE"}
            );
            setUsers(users.filter(u => u._id !== id));
        } catch (error) {
            setMessage("No se pudo eliminar el usuario")
            alert(message);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST"
        });
        localStorage.removeItem("user");
        router.push("/login");
    };

    return (
        <main
        className="min-h-screen flex flex-col bg-gradient-to-r from-[#f0b916] to-[#b36505] p-3 items-center justify center text-center"
        >
            <h1 className="text-3x1 font-bold mb-6">Panel de administración</h1>
            <button 
            className="btn btn-rojo absolute top-4 right-4 px-4 py-2"
            onClick={handleLogout}
            >
                Cerrar Sesión
            </button>
            <table className="w-full text-left border border-gray-300 bg-white-800">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Rol</th>
                        <th className="p-2">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? users.map(u => (
                        <tr key={u._id} className="border-b border-gray-500">
                            <td className="p-2">{u.username}</td>
                            <td className="p-2">{u.email}</td>
                            <td className="p-2">{u.role}</td>
                            <td className="p-2">
                                <button 
                                className="btn btn-rojo"
                                onClick={() => handleDelete(u._id)}
                                >
                                    eliminar
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <p>{message}</p>
                    )}
                </tbody>
            </table>
        </main>
    );
}
