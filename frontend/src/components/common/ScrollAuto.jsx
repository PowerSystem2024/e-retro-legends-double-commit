import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Desplaza automáticamente a la sección indicada por el hash (ej: /help#faq)
 * Permite un offset (por ej. para headers sticky).
 */
export default function useScrollToHash(offset = 80) {
    const location = useLocation();

    useEffect(() => {
        const id = location.hash?.slice(1); // elimina el "#" del hash

        const t = setTimeout(() => {
        if (id) {
            const el = document.getElementById(id);

            if (el) {
            // Primero hacemos scroll suave
            el.scrollIntoView({ behavior: "smooth", block: "start" });

            // Luego aplicamos un pequeño ajuste para compensar el header
            setTimeout(() => {
                const y = window.scrollY - offset;
                window.scrollTo({ top: y, behavior: "smooth" });
            }, 300); // tiempo para dejar terminar el scroll suave

            // Foco opcional
            try {
                el.focus?.({ preventScroll: true });
            } catch  (error) {
            console.warn("No se pudo enfocar el elemento destino:", error);
            }
            } else {
            // Si no hay id válido
            window.scrollTo({ top: 0, behavior: "smooth" });
            }
        } else {
            // Sin hash -> top
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        }, 100);

        return () => clearTimeout(t);
    }, [location.pathname, location.hash, offset]);
}
