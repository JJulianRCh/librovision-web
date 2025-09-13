"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const res = await fetch("/api/admin/users");
                const data = res.json();
                
                if (res.ok) {
                    setUsers(data.users);
                }
            } catch (error) {
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
            //
        }
    };


    return (
        <main
        className="min-h-screen flex flex-col bg-gradient-to-r from-[#f0b916] to-[#b36505] p-3 items-center justify center text-center"
        >
            <h1 className="text-3x1 font-bold mb-6">Panel de administración</h1>
            <table className="w-full text-left border border-gray-300">
                <thead>
                    <tr className="border-b border-gray-300">
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Email</th>
                        <th className="p-2">Rol</th>
                        <th className="p-2">Accion</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
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
                    ))}
                </tbody>
            </table>
        </main>
    );
}
