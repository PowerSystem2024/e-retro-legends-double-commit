import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useScrollToHash from '../../components/common/ScrollAuto';

export function SellerPage() {
useScrollToHash(1000);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(() => {
        const h = (location.hash || "").replace("#", "");
        if (!h) return "start";
        const normalized = String(h).toLowerCase();
        if (["fees", "resources", "start"].includes(normalized)) return normalized;
        return "start";
    });

    // cuando cambia el hash en la URL, actualizar la pestaña activa
    useEffect(() => {
        const h = (location.hash || "").replace("#", "").toLowerCase();
        if (!h) return;
        if (["fees", "resources", "start"].includes(h)) {
        setActiveTab(h);
        }
    }, [location.hash]);

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-4">Vende en e-Retro Legends</h1>
            <p className="text-xl mb-8 opacity-90">
                Únite a miles de vendedores y monetiza tu pasión por los deportes retro
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/login" className="bg-white text-blue-600 px-8 py-3 font-bold hover:bg-gray-100 transition border-2 border-white">
                Empezar Ahora
                </Link>
                <button
                onClick={() => setActiveTab("resources")}
                className="border-2 border-white text-white px-8 py-3 font-bold hover:bg-blue-700 transition"
                >
                Más Información
                </button>
            </div>
            </div>
        </section>

        {/* Tabs Navigation */}
        <section className="bg-white border-b-4 border-gray-300 sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-8 overflow-x-auto">
                <button
                    onClick={() => {
                        setActiveTab("start");
                        window.history.replaceState(null, "", `${location.pathname}#start`);
                    }}
                    className={`py-4 px-2 font-bold border-b-4 transition ${
                        activeTab === "start" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"
                    }`}
                    >
                    📚 Empieza a Vender
                    </button>
    
                    <button
                    onClick={() => {
                        setActiveTab("fees");
                        window.history.replaceState(null, "", `${location.pathname}#fees`);
                    }}
                    className={`py-4 px-2 font-bold border-b-4 transition ${
                        activeTab === "fees" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"
                    }`}
                    >
                    💰 Tarifas de Venta
                    </button>
    
                    <button
                    onClick={() => {
                        setActiveTab("resources");
                        window.history.replaceState(null, "", `${location.pathname}#resources`);
                    }}
                    className={`py-4 px-2 font-bold border-b-4 transition ${
                        activeTab === "resources" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600 hover:text-blue-600"
                    }`}
                    >
                    🎯 Recursos para Vendedores
                </button>
            </div>
            </div>
        </section>

        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* EMPIEZA A VENDER */}
            {activeTab === "start" && (
            <div className="space-y-12">
                <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Tres Pasos para Comenzar</h2>
                <p className="text-xl text-gray-600">Es rápido, fácil y gratis registrarse</p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white border-2 border-gray-400 p-8 text-center">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6 font-bold">
                    1
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Crea tu Cuenta</h3>
                    <p className="text-gray-600 mb-6">
                    Regístrate como vendedor en e-Retro Legends con tu email y contraseña. Completa tu perfil con información básica.
                    </p>
                    <Link to="/login" className="bg-blue-600 text-white px-6 py-2 font-bold hover:bg-blue-700 transition">
                    Crear Cuenta
                    </Link>
                </div>

                <div className="bg-white border-2 border-gray-400 p-8 text-center">
                    <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6 font-bold">
                    2
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Configura tu Tienda</h3>
                    <p className="text-gray-600 mb-6">
                    Personaliza tu perfil de vendedor, añade datos bancarios para pagos y configura tus métodos de envío.
                    </p>
                    <Link to="/seller/dashboard" className="bg-green-600 text-white px-6 py-2 font-bold hover:bg-green-700 transition">
                    Ir a Configuración
                    </Link>
                </div>

                <div className="bg-white border-2 border-gray-400 p-8 text-center">
                    <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-3xl mx-auto mb-6 font-bold">
                    3
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Publica tus Productos</h3>
                    <p className="text-gray-600 mb-6">
                    Crea anuncios con fotos, descripción y precio. ¡Comienza a recibir compras inmediatamente!
                    </p>
                    <Link to="/seller/products/new" className="bg-purple-600 text-white px-6 py-2 font-bold hover:bg-purple-700 transition">
                    Publicar Producto
                    </Link>
                </div>
                </div>

                {/* Requirements */}
                <div className="bg-blue-50 border-2 border-blue-400 p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-6">📋 Requisitos para Vendedores</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-4">
                    <span className="text-3xl">✅</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Ser Mayor de 18 Años</h4>
                        <p className="text-gray-600">Debes ser mayor de edad y tener capacidad legal para vender.</p>
                    </div>
                    </div>
                    <div className="flex gap-4">
                    <span className="text-3xl">✅</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Información Válida</h4>
                        <p className="text-gray-600">Proporciona datos reales y verificables de identidad.</p>
                    </div>
                    </div>
                    <div className="flex gap-4">
                    <span className="text-3xl">✅</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Cuenta Bancaria</h4>
                        <p className="text-gray-600">Necesitas una cuenta bancaria para recibir tus ganancias.</p>
                    </div>
                    </div>
                    <div className="flex gap-4">
                    <span className="text-3xl">✅</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Productos Auténticos</h4>
                        <p className="text-gray-600">Solo vende artículos originales en buen estado.</p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Benefits */}
                <div className="bg-white border-2 border-gray-400 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">🎁 Beneficios de Vender con Nosotros</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">🚀</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Alcance Global</h4>
                        <p className="text-gray-600">Accede a miles de compradores potenciales en toda la región.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">💳</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Pagos Seguros</h4>
                        <p className="text-gray-600">Recibe tus ganancias de forma segura y puntual.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">🛠️</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Herramientas Poderosas</h4>
                        <p className="text-gray-600">Panel de control completo para gestionar tu tienda.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">📊</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Analíticas Detalladas</h4>
                        <p className="text-gray-600">Sigue tu desempeño con estadísticas en tiempo real.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">🤝</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Soporte 24/7</h4>
                        <p className="text-gray-600">Equipo de atención siempre listo para ayudarte.</p>
                    </div>
                    </div>
                    <div className="flex gap-4 items-start">
                    <span className="text-4xl">🎯</span>
                    <div>
                        <h4 className="font-bold text-gray-900 mb-2">Marketing Incluido</h4>
                        <p className="text-gray-600">Promociona tus productos en nuestra plataforma.</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            )}

            {/* TARIFAS DE VENTA */}
            {activeTab === "fees" && (
            <div id="fees" className="space-y-12">
                <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Tarifas Transparentes y Justas</h2>
                <p className="text-xl text-gray-600">Sin sorpresas, sin cargos ocultos</p>
                </div>

                {/* Fee Structure */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white border-2 border-gray-400 p-8">
                    <div className="text-4xl mb-4">📋</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Tarifa de Listado</h3>
                    <p className="text-5xl font-bold text-green-600 mb-4">Gratis</p>
                    <p className="text-gray-600 mb-6">Publica tus productos sin costo inicial. Paga solo cuando vendas.</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Anuncios ilimitados</li>
                    <li>✓ Validez de 90 días</li>
                    <li>✓ Renovación automática</li>
                    <li>✓ Edición sin límites</li>
                    </ul>
                </div>

                <div className="bg-blue-50 border-2 border-blue-400 p-8 relative">
                    <div className="absolute top-0 right-0 bg-red-600 text-white px-4 py-1 text-sm font-bold">RECOMENDADO</div>
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Comisión por Venta</h3>
                    <p className="text-5xl font-bold text-blue-600 mb-4">8%</p>
                    <p className="text-gray-600 mb-6">Se cobra solo sobre el precio final de venta del artículo.</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Sin tarifas mensuales</li>
                    <li>✓ Flexible por volumen</li>
                    <li>✓ Pagos semanales</li>
                    <li>✓ Sin retenciones</li>
                    </ul>
                </div>

                <div className="bg-white border-2 border-gray-400 p-8">
                    <div className="text-4xl mb-4">🚚</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Envío</h3>
                    <p className="text-5xl font-bold text-green-600 mb-4">Flexible</p>
                    <p className="text-gray-600 mb-6">Tú establecer el costo de envío o ofrecer envío gratis.</p>
                    <ul className="text-sm text-gray-700 space-y-2">
                    <li>✓ Sin comisión en envíos</li>
                    <li>✓ Etiquetas de envío</li>
                    <li>✓ Seguimiento incluido</li>
                    <li>✓ Alianzas con transportes</li>
                    </ul>
                </div>
                </div>

                {/* Detailed Fees Table */}
                <div className="bg-white border-2 border-gray-400 overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="text-left p-4 font-bold">Concepto</th>
                        <th className="text-left p-4 font-bold">Tarifa</th>
                        <th className="text-left p-4 font-bold">Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="border-b-2 border-gray-200">
                        <td className="p-4 font-bold">Publicación de Anuncio</td>
                        <td className="p-4 text-green-600 font-bold">Gratis</td>
                        <td className="p-4 text-gray-600">Publica anuncios sin límite</td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="p-4 font-bold">Comisión por Venta</td>
                        <td className="p-4 text-red-600 font-bold">8%</td>
                        <td className="p-4 text-gray-600">Se cobra sobre el precio final</td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="p-4 font-bold">Opción Destacado</td>
                        <td className="p-4 font-bold">$2.99</td>
                        <td className="p-4 text-gray-600">Destaca tu producto 30 días</td>
                    </tr>
                    <tr className="border-b-2 border-gray-200">
                        <td className="p-4 font-bold">Galería Mejorada</td>
                        <td className="p-4 font-bold">Gratis</td>
                        <td className="p-4 text-gray-600">Hasta 12 fotos de alta resolución</td>
                    </tr>
                    <tr>
                        <td className="p-4 font-bold">Devoluciones</td>
                        <td className="p-4 text-gray-600">Variable</td>
                        <td className="p-4 text-gray-600">Sin comisión por reembolsos</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
            )}

            {/* RECURSOS PARA VENDEDORES */}
            {activeTab === "resources" && (
            <div id="resources" className="space-y-12">
                <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Recursos para el Éxito</h2>
                <p className="text-xl text-gray-600">Herramientas y guías para maximizar tus ventas</p>
                </div>

                {/* Resource Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Guides */}
                <div className="bg-white border-2 border-gray-400 p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6"><Link to="/404">📚 Guías y Tutoriales</Link></h3>
                    <div className="space-y-4">
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">📖</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Cómo Crear Anuncios Efectivos</h4>
                        <p className="text-sm text-gray-600">Aprende a escribir descripciones que vendan</p>
                        </div>
                    </div>
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">📸</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Fotografía de Productos</h4>
                        <p className="text-sm text-gray-600">Tips para fotos profesionales con tu teléfono</p>
                        </div>
                    </div>
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">💬</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Comunicación con Compradores</h4>
                        <p className="text-sm text-gray-600">Mejores prácticas para el servicio al cliente</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-2xl">📦</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Empaque y Envío</h4>
                        <p className="text-sm text-gray-600">Cómo proteger tus artículos en tránsito</p>
                        </div>
                    </div>
                    </div>
                </div>

                {/* Tools */}
                <div className="bg-white border-2 border-gray-400 p-8">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6"><Link to="/404">🛠️ Herramientas</Link></h3>
                    <div className="space-y-4">
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">📊</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Panel de Analytics</h4>
                        <p className="text-sm text-gray-600">Monitorea vistas, conversiones y ganancias</p>
                        </div>
                    </div>
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">🏷️</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Gestor de Inventario</h4>
                        <p className="text-sm text-gray-600">Controla el stock de todos tus productos</p>
                        </div>
                    </div>
                    <div className="flex gap-4 pb-4 border-b-2 border-gray-200">
                        <span className="text-2xl">📧</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Email Marketing</h4>
                        <p className="text-sm text-gray-600">Promociona ofertas a clientes existentes</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <span className="text-2xl">🎨</span>
                        <div>
                        <h4 className="font-bold text-gray-900">Plantillas de Anuncios</h4>
                        <p className="text-sm text-gray-600">Diseños profesionales listos para usar</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>

                {/* Learning Center */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 p-8">
                <h3 className="text-2xl font-bold text-purple-900 mb-6">🎓 Centro de Aprendizaje</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white border-2 border-purple-300 p-6 text-center hover:shadow-lg transition">
                    <div className="text-5xl mb-4">🚀</div>
                    <h4 className="font-bold text-lg mb-2">Principiantes</h4>
                    <p className="text-sm text-gray-600 mb-4">Guía paso a paso para nuevos vendedores</p>
                    <Link to="/404" className="text-purple-600 font-bold hover:underline">Ver Curso →</Link>
                    </div>
                    <div className="bg-white border-2 border-purple-300 p-6 text-center hover:shadow-lg transition">
                    <div className="text-5xl mb-4">📈</div>
                    <h4 className="font-bold text-lg mb-2">Intermedio</h4>
                    <p className="text-sm text-gray-600 mb-4">Estrategias para aumentar tus ventas</p>
                    <Link to="/404" className="text-purple-600 font-bold hover:underline">Ver Curso →</Link>
                    </div>
                    <div className="bg-white border-2 border-purple-300 p-6 text-center hover:shadow-lg transition">
                    <div className="text-5xl mb-4">👑</div>
                    <h4 className="font-bold text-lg mb-2">Avanzado</h4>
                    <p className="text-sm text-gray-600 mb-4">Optimización y escalabilidad del negocio</p>
                    <Link to="/404" className="text-purple-600 font-bold hover:underline">Ver Curso →</Link>
                    </div>
                </div>
                </div>

                {/* FAQ */}
                <div className="bg-white border-2 border-gray-400 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">❓ Preguntas Frecuentes</h3>
                <div className="space-y-4">
                    <details className="border-b-2 border-gray-200 pb-4">
                    <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                        ¿Cuánto tiempo tarda en procesarse mi pago?
                    </summary>
                    <p className="text-gray-600 mt-3">Los pagos se procesan semanalmente. El dinero se depositará en tu cuenta bancaria dentro de 3-5 días hábiles.</p>
                    </details>
                    <details className="border-b-2 border-gray-200 pb-4">
                    <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                        ¿Puedo vender desde cualquier país?
                    </summary>
                    <p className="text-gray-600 mt-3">Actualmente servimos a vendedores en Argentina, Chile, Uruguay y Paraguay. Próximamente expandiremos a más países.</p>
                    </details>
                    <details className="border-b-2 border-gray-200 pb-4">
                    <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                        ¿Hay límite de productos que pueda vender?
                    </summary>
                    <p className="text-gray-600 mt-3">No, puedes publicar tantos productos como desees. A mayor cantidad, mejor visibilidad en la plataforma.</p>
                    </details>
                    <details className="border-b-2 border-gray-200 pb-4">
                    <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                        ¿Qué pasa si hay un problema con un comprador?
                    </summary>
                    <p className="text-gray-600 mt-3">Nuestro equipo de soporte mediará en disputas para proteger a ambas partes. Tenemos un proceso justo y transparent.</p>
                    </details>
                    <details>
                    <summary className="font-bold text-gray-900 cursor-pointer hover:text-blue-600">
                        ¿Necesito ser profesional para vender?
                    </summary>
                    <p className="text-gray-600 mt-3">No, cualquier persona puede vender. Solo necesitas ser mayor de 18 años y tener productos auténticos.</p>
                    </details>
                </div>
                </div>
            </div>
            )}

            {/* Final CTA */}
            <div className="mt-12 bg-gradient-to-r from-green-600 to-green-800 text-white p-8 rounded-lg">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                <h3 className="text-2xl font-bold">Publicar tu primer producto es gratis</h3>
                <p className="text-sm opacity-90">Únite hoy y empieza a vender en minutos. Tenemos soporte para nuevos vendedores.</p>
                </div>
                <div className="flex gap-4">
                <Link to="Auth/Register" className="bg-white text-green-700 px-6 py-3 font-bold rounded hover:bg-gray-100 transition">Registrarme</Link>
                <Link to="/help" className="border-2 border-white px-6 py-3 font-bold rounded hover:bg-white hover:text-green-700 transition">Necesito ayuda</Link>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}

export default SellerPage;