import React from 'react';
import { Link } from 'react-router-dom';
import useScrollToHash from '../../components/common/ScrollAuto';

export const About = () => {
useScrollToHash(window.innerWidth < 768 ? 60 : 100);
    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-4">
                Sobre e-Retro Legends
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
                Reviviendo la nostalgia deportiva desde 1999
            </p>
            </div>
        </section>

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-4 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Acerca de</span>
        </nav>

        {/* Quiénes Somos */}
        <section id="quienes-somos" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-4">
                    🏆 Quiénes Somos
                </h2>
                <p className="text-gray-700 mb-4">
                    <strong>e-Retro Legends</strong> nació en 1999 con una misión simple pero apasionante: 
                    preservar y compartir la historia del deporte a través de piezas auténticas y memorables.
                </p>
                <p className="text-gray-700 mb-4">
                    Somos más que un marketplace de artículos deportivos vintage. Somos una comunidad 
                    de coleccionistas, fanáticos y nostálgicos que valoran cada camiseta, cada firma 
                    y cada pieza que cuenta una historia única.
                </p>
                <p className="text-gray-700 mb-4">
                    Con más de 25 años en el mercado, hemos conectado a miles de vendedores y compradores 
                    apasionados por el deporte retro, desde las icónicas camisetas de Brasil '70 hasta 
                    los jerseys de los Bulls de Jordan.
                </p>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 p-8 text-center">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Nuestra Misión</h3>
                <p className="text-gray-700">
                    Conectar coleccionistas con piezas auténticas del deporte, 
                    preservando la historia y la pasión por las leyendas deportivas 
                    de todas las épocas.
                </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 border-2 border-green-700 text-center">
                <p className="text-4xl font-bold mb-2">25+</p>
                <p className="text-sm">Años de experiencia</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 border-2 border-blue-700 text-center">
                <p className="text-4xl font-bold mb-2">50K+</p>
                <p className="text-sm">Productos vendidos</p>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 border-2 border-purple-700 text-center">
                <p className="text-4xl font-bold mb-2">10K+</p>
                <p className="text-sm">Vendedores activos</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 border-2 border-orange-700 text-center">
                <p className="text-4xl font-bold mb-2">100K+</p>
                <p className="text-sm">Usuarios felices</p>
                </div>
            </div>
            </div>
        </section>

        {/* Nuestros Valores */}
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Nuestros Valores
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-400 p-6 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Autenticidad</h3>
                <p className="text-gray-700">
                Verificamos cada producto para garantizar su autenticidad y calidad.
                </p>
            </div>
            <div className="bg-white border-2 border-gray-400 p-6 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Confianza</h3>
                <p className="text-gray-700">
                Protección del comprador y vendedor en cada transacción.
                </p>
            </div>
            <div className="bg-white border-2 border-gray-400 p-6 text-center hover:shadow-lg transition">
                <div className="text-5xl mb-4">❤️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Pasión</h3>
                <p className="text-gray-700">
                Compartimos el amor por el deporte y su historia.
                </p>
            </div>
            </div>
        </section>

        {/* Trabaja con Nosotros */}
        <section id="careers" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                💼 Trabaja con Nosotros
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <p className="text-gray-700 mb-4">
                    ¿Te apasiona el deporte y la tecnología? En e-Retro Legends estamos 
                    siempre buscando talento que comparta nuestra visión.
                </p>
                <h3 className="font-bold text-lg text-gray-900 mb-3">
                    Posiciones Abiertas:
                </h3>
                <ul className="space-y-3">
                    <li className="border-l-4 border-blue-600 pl-4">
                    <p className="font-bold text-gray-900">Desarrollador Full Stack</p>
                    <p className="text-sm text-gray-600">Buenos Aires, Argentina - Remoto</p>
                    </li>
                    <li className="border-l-4 border-blue-600 pl-4">
                    <p className="font-bold text-gray-900">Especialista en Autenticación</p>
                    <p className="text-sm text-gray-600">Mendoza, Argentina - Híbrido</p>
                    </li>
                    <li className="border-l-4 border-blue-600 pl-4">
                    <p className="font-bold text-gray-900">Customer Success Manager</p>
                    <p className="text-sm text-gray-600">Mendoza, Argentina - Híbrido</p>
                    </li>
                </ul>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 p-6">
                <h3 className="font-bold text-xl text-blue-900 mb-4">Beneficios</h3>
                <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Trabajo remoto flexible</span>
                    </li>
                    <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Salario competitivo en USD</span>
                    </li>
                    <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>15 días de vacaciones pagadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Budget para equipamiento</span>
                    </li>
                    <li className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Capacitación continua</span>
                    </li>
                </ul>
                <button className="w-full mt-6 bg-blue-600 text-white py-3 font-bold hover:bg-blue-700 transition border-2 border-blue-800">
                     <a href="mailto:cv@retrolegends.com">Enviar CV</a>
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* Prensa */}
        <section id="press" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                📰 Sala de Prensa
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Últimas Noticias
                </h3>
                <div className="space-y-4">
                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="text-sm text-gray-600">15 de Enero, 2025</p>
                    <p className="font-bold text-gray-900">
                        e-Retro Legends alcanza los 100,000 usuarios activos
                    </p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="text-sm text-gray-600">3 de Diciembre, 2024</p>
                    <p className="font-bold text-gray-900">
                        Nueva funcionalidad: Verificación de autenticidad con IA
                    </p>
                    </div>
                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                    <p className="text-sm text-gray-600">20 de Noviembre, 2024</p>
                    <p className="font-bold text-gray-900">
                        Expansión a nuevos mercados en América Latina
                    </p>
                    </div>
                </div>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-400 p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Contacto de Prensa
                </h3>
                <p className="text-gray-700 mb-4">
                    Para consultas de medios, entrevistas o información adicional:
                </p>
                <div className="space-y-3 text-sm">
                    <p>
                    <strong>Email:</strong> press@retrolegends.com
                    </p>
                    <p>
                    <strong>Teléfono:</strong> +54 2XXX XXXX
                    </p>
                    <p>
                    <strong>Horario:</strong> Lun-Vie 9:00-18:00 (GMT-3)
                    </p>
                </div>
                <button className="w-full mt-6 bg-yellow-500 text-gray-900 py-3 font-bold hover:bg-yellow-600 transition border-2 border-yellow-600">
                    <a href="mailto:prensa@retrolegends.com">Kit de Prensa</a>
                </button>
                </div>
            </div>
            </div>
        </section>

        {/* CTA Final */}
        <section className="bg-blue-900 text-white py-12">
            <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
                ¿Listo para revivir la nostalgia?
            </h2>
            <p className="text-lg mb-6">
                Únete a miles de coleccionistas que confían en e-Retro Legends
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
                <Link to="/products">
                <button className="bg-white text-blue-900 px-8 py-3 font-bold hover:bg-gray-100 transition border-2 border-white">
                    Explorar Productos
                </button>
                </Link>
                <Link to="/login">
                <button className="bg-transparent text-white px-8 py-3 font-bold hover:bg-blue-800 transition border-2 border-white">
                    Crear Cuenta
                </button>
                </Link>
            </div>
            </div>
        </section>
        </div>
    );
};

export default About;