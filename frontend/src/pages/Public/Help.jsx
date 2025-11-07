// frontend/src/pages/Public/Help.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import useScrollToHash from '../../components/common/ScrollAuto';

export const Help = () => {
useScrollToHash(window.innerWidth < 768 ? 60 : 100);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Mensaje enviado. Te contactaremos pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl font-extrabold mb-4">
                Centro de Ayuda
            </h1>
            <p className="text-xl">
                Estamos aquí para ayudarte
            </p>
            </div>
        </section>

        {/* Breadcrumb */}
        <nav className="max-w-7xl mx-auto px-4 py-4 text-sm">
            <Link to="/" className="text-blue-600 hover:underline">Inicio</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-600">Ayuda</span>
            </nav>


        {/* Preguntas Frecuentes */}
        <section id="faq" className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            ❓ Preguntas Frecuentes
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
            {[
            {
                q: "¿Cómo compro un producto?",
                a: 'Busca el producto que te interesa, hacé clic en "Agregar al carrito", revisá tu pedido y procedé al pago. Es muy simple y seguro.',
            },
            {
                q: "¿Cómo sé si un producto es auténtico?",
                a: "Todos nuestros productos pasan por un proceso de verificación. Los vendedores certificados tienen un distintivo especial y garantizamos la autenticidad.",
            },
            {
                q: "¿Cuánto tarda el envío?",
                a: "El tiempo de envío varía según el vendedor y tu ubicación. Generalmente entre 5 y 7 días hábiles para envíos nacionales, y de 10 a 15 días para internacionales.",
            },
            {
                q: "¿Puedo devolver un producto?",
                a: "Sí, tenés 30 días para devolver productos que no cumplan con la descripción o lleguen dañados. Podés consultar nuestra política de devoluciones completa abajo.",
            },
            {
                q: "¿Cómo me convierto en vendedor?",
                a: "Registrate con una cuenta de vendedor, completá tu perfil, verificá tu identidad y comenzá a publicar tus productos. ¡Es gratis empezar!",
            },
            {
                q: "¿Qué métodos de pago aceptan?",
                a: "Aceptamos tarjetas de crédito/débito, Mercado Pago, transferencias bancarias y otros métodos locales según tu país.",
            },
            ].map((faq, i) => (
            <div
                key={i}
                className="bg-white border-2 border-gray-300 p-6 rounded-lg hover:shadow-lg transition"
            >
                <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700">{faq.a}</p>
            </div>
            ))}
        </div>
        </section>

        {/* Información de Envío */}
        <section id="shipping" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                🚚 Información de Envío
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Tiempos de Entrega
                </h3>
                <table className="w-full border-2 border-gray-400">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="border-2 border-gray-400 p-3 text-left">Destino</th>
                        <th className="border-2 border-gray-400 p-3 text-left">Tiempo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border-2 border-gray-400 p-3">Argentina</td>
                        <td className="border-2 border-gray-400 p-3 font-bold">5-7 días hábiles</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-gray-400 p-3">Resto de LATAM</td>
                        <td className="border-2 border-gray-400 p-3 font-bold">10-15 días hábiles</td>
                    </tr>
                    <tr>
                        <td className="border-2 border-gray-400 p-3">Internacional</td>
                        <td className="border-2 border-gray-400 p-3 font-bold">15-30 días hábiles</td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <div>
                <h3 className="font-bold text-xl text-gray-900 mb-4">
                    Costos de Envío
                </h3>
                <div className="space-y-3">
                    <div className="bg-green-50 border-2 border-green-400 p-4">
                    <p className="font-bold text-green-800 mb-2">✓ Envío Gratis</p>
                    <p className="text-sm text-gray-700">
                        En compras superiores a $45.000 dentro de Argentina
                    </p>
                    </div>
                    <div className="border-2 border-gray-400 p-4">
                    <p className="font-bold text-gray-900 mb-2">Envío Estándar</p>
                    <p className="text-sm text-gray-700">
                        $5000 - $15000 según peso y destino
                    </p>
                    </div>
                    <div className="border-2 border-gray-400 p-4">
                    <p className="font-bold text-gray-900 mb-2">Envío Express</p>
                    <p className="text-sm text-gray-700">
                        $12000 - $25000 (1-2 días hábiles)
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 p-4">
                <p className="text-sm text-gray-700">
                <strong>📦 Nota:</strong> El vendedor es responsable del envío. Los tiempos pueden variar según disponibilidad y procesos de cada vendedor.
                </p>
            </div>
            </div>
        </section>

        {/* Política de Devoluciones */}
        <section id="returns" className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                🔄 Política de Devoluciones
            </h2>
            <div className="prose max-w-none">
                <h3 className="font-bold text-xl text-gray-900 mb-4">
                Garantía de Satisfacción
                </h3>
                <p className="text-gray-700 mb-4">
                En e-Retro Legends queremos que estés 100% satisfecho con tu compra. 
                Si no estás conforme, tienes <strong>30 días</strong> desde la recepción 
                para solicitar una devolución.
                </p>

                <h3 className="font-bold text-xl text-gray-900 mb-4 mt-6">
                Motivos Válidos para Devolución
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Producto no coincide con la descripción</li>
                <li>Producto llegó dañado o defectuoso</li>
                <li>Producto no es auténtico (sujeto a verificación)</li>
                <li>Talla incorrecta (solo si el vendedor lo permite)</li>
                </ul>

                <h3 className="font-bold text-xl text-gray-900 mb-4 mt-6">
                Proceso de Devolución
                </h3>
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="border-2 border-gray-400 p-4 text-center">
                    <div className="text-3xl mb-2">1️⃣</div>
                    <p className="font-bold text-sm">Contacta al vendedor</p>
                </div>
                <div className="border-2 border-gray-400 p-4 text-center">
                    <div className="text-3xl mb-2">2️⃣</div>
                    <p className="font-bold text-sm">Abre un reclamo</p>
                </div>
                <div className="border-2 border-gray-400 p-4 text-center">
                    <div className="text-3xl mb-2">3️⃣</div>
                    <p className="font-bold text-sm">Devuelve el producto</p>
                </div>
                <div className="border-2 border-gray-400 p-4 text-center">
                    <div className="text-3xl mb-2">4️⃣</div>
                    <p className="font-bold text-sm">Recibe tu reembolso</p>
                </div>
                </div>

                <div className="bg-red-50 border-2 border-red-400 p-4 mt-6">
                <p className="font-bold text-red-800 mb-2">⚠️ Importante:</p>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li>• El producto debe estar en su estado original</li>
                    <li>• Incluir todas las etiquetas y embalaje</li>
                    <li>• Los gastos de envío de devolución corren por cuenta del comprador (excepto si el producto está defectuoso)</li>
                    <li>• El reembolso se procesa en 5-10 días hábiles</li>
                </ul>
                </div>
            </div>
            </div>
        </section>

        {/* Formulario de Contacto */}
        <section id="contact" className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-white border-2 border-gray-400 p-8">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
                📧 Contáctanos
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                    Información de Contacto
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                    <span className="text-2xl">📍</span>
                    <div>
                        <p className="font-bold text-gray-900">Oficinas</p>
                        <p className="text-sm text-gray-600">
                        Av. 12 de Julio 1234<br />
                        Argentina, C.A.B.A.
                        </p>
                    </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <span className="text-2xl">📞</span>
                    <div>
                        <p className="font-bold text-gray-900">Teléfono</p>
                        <p className="text-sm text-gray-600">+54 2XXX XXXX</p>
                    </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <span className="text-2xl">✉️</span>
                    <div>
                        <p className="font-bold text-gray-900">Email</p>
                        <p className="text-sm text-gray-600">soporte@retrolegends.com</p>
                    </div>
                    </div>
                    <div className="flex items-start gap-3">
                    <span className="text-2xl">🕐</span>
                    <div>
                        <p className="font-bold text-gray-900">Horario</p>
                        <p className="text-sm text-gray-600">
                        Lun-Vie: 9:00 - 18:00<br />
                        Sáb: 10:00 - 14:00
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="name"
                    label="Nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    name="subject"
                    label="Asunto"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                />
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2 text-gray-700">
                    Mensaje <span className="text-red-600">*</span>
                    </label>
                    <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 outline-none"
                    ></textarea>
                </div>

                <div id='bottom' className="flex items-center justify-between gap-4">
                    <Button type="submit" variant="primary">
                    Enviar mensaje
                    </Button>
                    <Link to="/products" className="text-sm text-blue-600 hover:underline">
                    Volver a la tienda
                    </Link>
                </div>
                </form>
            </div>
            </div>
        </section>
        </div>
    );
};

export default Help;