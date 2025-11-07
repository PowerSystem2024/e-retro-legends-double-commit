import React from 'react';
import { useNavigation } from 'react-router-dom';

export function ComingSoonPage() {
    const navigate = useNavigation()
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white border-2 border-gray-400 p-8 md:p-16 text-center">
            {/* Icono */}
            <div className="text-8xl mb-6">🚧</div>

            {/* Título */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4">
            Página en Construcción
            </h1>

            {/* Descripción */}
            <p className="text-lg text-gray-600 mb-8">
            Esta sección está siendo preparada. Pronto tendremos más contenido disponible.
            </p>

            {/* Botón Volver */}
            <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-blue-600 text-white font-bold hover:bg-blue-700 transition border-2 border-blue-800"
            >
            ← Volver al Inicio
            </button>
        </div>
        </div>
    );
}

export default ComingSoonPage;