"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import Modal from "@/components/Modal";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);

    const [showFormModal, setShowFormModal] = useState(false);
    const [showReviewsModal, setShowReviewsModal] = useState(false);

    const [message, setMessage] = useState("");
    const [query, setQuery] = useState("");

    const [myReviews, setMyReviews] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        review: "",
        rank: 0,
        userId: ""
    });
    
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData((prev) => ({...prev, userId: parsedUser.id || parsedUser._id}));
        } else {
            router.push("/login");
        }
    }, [router]);

    const handleChange = e => {
        if (!user) return;
        setFormData({
            ...formData,
            userId: user.id || user._id,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('/api/reviews', {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            setMessage(data.message);
            setShowFormModal(!showFormModal);
        } catch (error) {
            setMessage("Ocurrio un error");
        }
    };

    const handleSearch = async e => {
        if (!query.trim()) return;
        try {
            const res = await fetch(`/api/reviews?title=${encodeURIComponent(query)}`);
            const data = await res.json();
            if (res.ok) {
                setReviews(data.reviews);
                setMessage(data.reviews.length ? "" : "No se encontro ningun libro");
            }
        } catch (error) {
            setMessage("Error en la busqueda");
        }
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST"
        });
        localStorage.removeItem("user");
        router.push("/login");
    };

    const fetchMyReviews = async e => {
        if (!user) return;
        try {
            const res = await fetch(`/api/reviews?userId=${user._id || user.id}`);
            const data = await res.json();
            if (res.ok) {
                setMyReviews(data.reviews);
                setMessage(data.reviews.length ? "" : "No ha publicado ninguna reseña");
            }
        } catch (error) {
            setMessage("Error")
        }

    };

    useEffect(() => {
        if (showReviewsModal && user) fetchMyReviews();
    }, [showReviewsModal, user]);

    return (
        <main 
        className="min-h-screen flex flex-col bg-gradient-to-r from-[#191c36] to-[#253c5e] p-3 items-center justify center text-center"
        >
            <p className="text-4x1 m-2">Hola, {user?.username || "Cargando..."}</p>
            <button 
            className="btn btn-rojo absolute top-4 right-4 px-4 py-2"
            onClick={handleLogout}
            >
                Cerrar Sesión
            </button>
            <div>
                <input
                className="w-100 p-1 bg-gray-800 max-w-md mb-6 border rounded"
                type="text"
                placeholder="Buscar un libro para ver sus reseñas"
                value={query}
                onChange={e => setQuery(e.target.value)}
                />
                <button
                className="btn btn-azul p-2"
                onClick={handleSearch}
                >
                    Buscar
                </button>
            </div>
            <div>
                <button
                className="btn btn-azul p-2 m-1 hover:shadow-2x1 transition-shadow"
                onClick={() => setShowReviewsModal(!showReviewsModal)}
                >
                    Ver mis reseñas
                </button>
                <button 
                className="btn btn-verde p-2 m-1 hover:shadow-2x1 transition-shadow"
                onClick={() => setShowFormModal(!showFormModal)}
                >
                    Publicar reseña
                </button>
            </div>

            <Modal isOpen={showFormModal} onClose={() => setShowFormModal(!showFormModal)}>
                <h2 className="text-x1 font-bold mb-3">Publica tu reseña</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                    type="text"
                    name="title"
                    placeholder="Titulo del libro"
                    className="input"
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    name="author"
                    placeholder="Autor del libro"
                    className="input"
                    onChange={handleChange}
                    />
                    <input
                    type="Number"
                    name="rank"
                    placeholder="Puntuación (0-5)"
                    min={0}
                    max={5}
                    className="input"
                    onChange={handleChange}
                    />
                    <textarea
                    placeholder="Escribe tu reseña"
                    name="review"
                    rows={4}
                    className="w-full p-2 border rounded bg-white text-black"
                    onChange={handleChange}
                    />
                    <button 
                    className="btn btn-verde"
                    type="submit"
                    >
                        Subir reseña
                    </button>
                    <br/>
                    <p>{message}</p>
                </form>
            </Modal>
            <Modal isOpen={showReviewsModal} onClose={() => setShowReviewsModal(!showReviewsModal)}>
                <h2 className="text-x1 font-bold mb-3">Mis reseñas</h2>
                <div className="flex flex-wrap justify-start gap-4 bg-gray-800 border border-black-200 rounded w-300 h-90 overflow-y-auto">
                    {myReviews.length > 0 ? (
                        myReviews.map((review) => (
                            <ReviewCard key={review._id} bookreview={review}/>
                        ))
                    ) : (
                        <p>No tienes ninguna reseña</p>
                    )}
                </div>
            </Modal>
            <br/>
            <div className="flex flex-wrap justify-start gap-4 bg-gray-800 border border-black-200 rounded w-300 h-90 overflow-y-auto">
                { reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review._id} bookreview={review}/>
                    ))
                ) : (
                    <p>No se encontro resultados</p>
                )}
            </div>
        </main>
    );
}
