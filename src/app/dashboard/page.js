"use client";
import { useState } from "react";
import ReviewCard from "@/components/ReviewCard";
import Modal from "@/components/Modal";

export default function DashboardPage() {
    const [showFormModal, setShowFormModal] = useState(false);
    const [showReviewsModal, setShowReviewsModal] = useState(false);
    

    return (
        <main 
        className="min-h-screen flex flex-col bg-gradient-to-r from-[#191c36] to-[#253c5e] p-3 items-center justify center text-center"
        >
            <p className="text-4x1 m-2">Hola</p>
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
                <form className="space-y-3">
                    <input
                    type="text"
                    placeholder="Titulo del libro"
                    className="input"
                    />
                    <input
                    type="text"
                    placeholder="Autor del libro"
                    className="input"
                    />
                    <input
                    type="Number"
                    placeholder="Puntuación (0-5)"
                    min={0}
                    max={5}
                    className="input"
                    />
                    <textarea
                    placeholder="Escribe tu reseña"
                    rows={4}
                    className="w-full p-2 border rounded bg-white text-black"
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
                {/* Lista de reseñas del usuario */}
            </div>
            </Modal>
            <br/>
            <div className="flex flex-wrap justify-start gap-4 bg-gray-800 border border-black-200 rounded w-300 h-90 overflow-y-auto">
                {/* Lista de reseñas de un libro */}
            </div>
        </main>
    );
}