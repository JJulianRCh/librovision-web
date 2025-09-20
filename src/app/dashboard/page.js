"use client";
import { useState, useEffect } from "react";
import ReviewCard from "@/components/ReviewCard";
import Modal from "@/components/Modal";

export default function DashboardPage() {
    const user = JSON.parse(localStorage.getItem("user"));

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
        userId: user.userId
    });

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch('/api/reviews', {
                method: "POST",
                headers: { "Contend-type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            setMessage(data.message);

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

    const fetchMyReviews = async e => {
        if (!query.trim()) return;
        try {
            const res = await fetch(`/api/reviews?userId=${user.username}`);
            const data = res.json();
            if (res.ok) {
                setMyReviews(data.reviews);
            }
        } catch (error) {
            setMessage("Error")
        }
    };

    useEffect(() => {
        if (showReviewsModal) fetchMyReviews();
    }, [showReviewsModal]);

    return (
        <main 
        className="min-h-screen flex flex-col bg-gradient-to-r from-[#191c36] to-[#253c5e] p-3 items-center justify center text-center"
        >
            <p className="text-4x1 m-2">Hola, {user.username}</p>
            <input
                className="w-100 p-1 bg-gray-800 max-w-md mb-6 border rounded"
                type="text"
                placeholder="Buscar un libro para ver sus reseñas"

            />
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
                    placeholder="Titulo del libro"
                    className="input"
                    onChange={handleChange}
                    />
                    <input
                    type="text"
                    placeholder="Autor del libro"
                    className="input"
                    onChange={handleChange}
                    />
                    <input
                    type="Number"
                    placeholder="Puntuación (0-5)"
                    min={0}
                    max={5}
                    className="input"
                    onChange={handleChange}
                    />
                    <textarea
                    placeholder="Escribe tu reseña"
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
                </form>
            </Modal>
            <Modal isOpen={showReviewsModal} onClose={() => setShowReviewsModal(!showReviewsModal)}>
                <h2 className="text-x1 font-bold mb-3">Mis reseñas</h2>
                <div className="flex flex-wrap justify-start gap-4 bg-gray-800 border border-black-200 rounded w-300 h-90 overflow-y-auto">
                    {myReviews.length > 0 ? (
                        myReviews.map((review) => (
                            <ReviewCard key={review._id} bookreview={review} />
                        ))
                    ) : (
                        <p>No tienes ninguna reseña</p>
                    )}
                </div>
            </Modal>
            <br/>
            <div className="flex flex-wrap justify-start gap-4 bg-gray-800 border border-black-200 rounded w-300 h-90 overflow-y-auto">
                {
                    reviews.map((review) => (
                        <ReviewCard key={review._id} bookreview={review}/>
                    ))
                }
            </div>
        </main>
    );
}